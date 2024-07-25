import React, { useState } from 'react';
import Widget from "./Widget"
function App() {
  const bot = { name: "ROBOT", url: "robot.png", profile: "Sowmya's Assistant" }
  const [messages, setMessages] = useState([])
  const handleMessages = (newmessages, newmassage = null) => {
    const f = [...newmessages]
    setMessages(newmessages)
    BotMsg(f)
  }

  const BotMsg = async (messages) => {
    const message = messages[0].message
    console.log(message)
    fetch(`http://localhost:3000/get-answer`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question: message }),
      }
    )
      .then(response => response.json())
      .then(data => {
        console.log(data)
        const answer = data.answer.trim()
        const finalAnswer = answer.charAt(0).toUpperCase() + answer.slice(1)
        setMessages([{ message: finalAnswer, url: bot.url }, ...messages]);
      });
  }

  return (
    <div className="h-screen bg-gray-200 relative">
      <div style={{width: '100%'}} className=" absolute left-3 flex bottom-2 right-3 sm:bottom-6 sm:right-6">

        <Widget className="bottom-0"
          style={{ height: '80vh',width: '100%', backgroundColor: "red" }}
          bot={bot}
          setMessages={handleMessages}
          messages={messages}
        />
      </div>
    </div>
  );
}

export default App;
//