import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { spawn } from 'child_process'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

let backendProcess = null

function startBackend() {
  return new Promise((resolve, reject) => {
    try {
      const backendPath = is.dev
        ? join(__dirname, '../../../backend/dist/main/main') // might need to change this path
        : join(process.resourcesPath, 'backend/main') // prod env path

      backendProcess = spawn(backendPath, [], {
        detached: false,
        stdio: ['ignore', 'ignore', 'ignore']
      })

      backendProcess.on('error', (error) => {
        reject(error)
      })

      backendProcess.on('close', () => {
        backendProcess = null
      })

      setTimeout(() => {
        if (backendProcess && !backendProcess.killed) {
          resolve()
        } else {
          reject(new Error('Backend failed to start'))
        }
      }, 2000)
    } catch (error) {
      reject(error)
    }
  })
}

function stopBackend() {
  if (backendProcess && !backendProcess.killed) {
    console.log('Stopping backend process...')
    backendProcess.kill('SIGTERM')
    backendProcess = null
  }
}

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  // Start the backend server first
  try {
    await startBackend()
    createWindow()
  } catch (error) {
    console.error('Failed to start backend, creating window anyway:', error)
    createWindow() // Create window even if backend fails
  }

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  stopBackend()
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('before-quit', () => {
  stopBackend()
})

app.on('will-quit', () => {
  stopBackend()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
