import { useState, useEffect } from 'react'

function App() {
  const [messageData, setMessageData] = useState(null)
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/messages')
        const data = await response.json()
        setMessageData(data.messages)
      } catch (error) {
        console.error('Error fetching message from backend:', error)
      }
    }

    fetchMessage()
    const intervalId = setInterval(fetchMessage, 2000)

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    if (messageData && messageData.length > 0) {
      const timer = setInterval(() => {
        setMessageIndex((prevIndex) => (prevIndex + 1) % messageData.length)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [messageData])

  const currentMessage = messageData && messageData[messageIndex]

  return (
    <>
      <div className="text">
        {currentMessage ? (
          <div className="message-display">
            <h2>Message #{currentMessage.id}</h2>
            <p>
              <strong>Content:</strong> {currentMessage.content}
            </p>
            <p>
              <strong>Created at:</strong> {new Date(currentMessage.created_at).toLocaleString()}
            </p>
            <p>
              <strong>Timestamp:</strong> {currentMessage.created_at}
            </p>
          </div>
        ) : (
          <span className="react">Loading messages...</span>
        )}
      </div>
    </>
  )
}

export default App
