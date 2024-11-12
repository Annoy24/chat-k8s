import React, { useState, useEffect } from 'react'
import socketIO from 'socket.io-client';

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const socket = socketIO.connect(backendUrl);

const Home = () => {
  const [message, setmessage] = useState("")
  const [messages, setMessages] = useState([]);

  console.log(messages)

  useEffect(() => {
    socket.on('messageResponse', (data) => setMessages([...messages, data]));
  }, [socket, messages]);


  const handleSendMessage = (e) => {
    e.preventDefault();
  //  console.log("clickeing")
    socket.emit('message', {
      text: message,
      socketID: socket.id,
    });
    
    setmessage('');
  };
  return (
    <div>
        <div id='chatbox' style={{height:"400px",  width: "500px"}}>
           <div className="msg-container" style={{height:"350px", borderBottom:" 2px solid black"}}>
              {messages.map((msg)=>{
                return  <p key={msg.id}>{msg.text}</p>
              })}
            </div>
            <div id="text-area">
                <input name="" value={message} id='area' onChange={(e)=>{
                  setmessage(e.target.value)
                }}/>  
                <button className='btn' onClick={handleSendMessage}> send</button>
            </div>
        </div>
    </div>
  )
}

export default Home