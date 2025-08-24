import { useState, useEffect } from 'react'

function App() {
  const [message, setMessage] = useState('hello!')

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch('http://localhost:8000/')
        const data = await response.json()
        setMessage(data.message)
      } catch (error) {
        console.error('Error fetching message from backend:', error)
        // Keep the initial "hello!" message if fetch fails
      }
    }

    fetchMessage()
  }, [])

  return (
    <>
      <div className="text">
        <span className="react">{message}</span>
      </div>
    </>
  )
}

export default App
