"use client"
import React, { useEffect, useState } from 'react';
import { 
  Paperclip, 
  Smile, 
  Send, 
  MoreVertical, 
  Phone, 
  Video
} from 'lucide-react';
import './page.css';
import { useSocket } from './context/socketProvider';

export interface Message {
  text: string;
  sent: boolean;
  timestamp: string;
}

function App() {
  // const [messages, setMessages] = useState<Message[]>([
  //   { id: 1, text: "Hey! How are you?", sent: false, timestamp: "10:30 AM" },
  // ]);
  // const [newMessage, setNewMessage] = useState("");
  const {sendingMessage,Messages} = useSocket()

  

  const [message,setMessage]= useState<string>("")

  const handleSend = () => {
    sendingMessage(message)
    setMessage("")
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTouchSend = () => {
    handleSend();
  };


  


  

  return (
    <div className="app-container">
      <div className="header">
        <div className="header-content">
          <div className="header-inner">
            <div className="user-info">
              <div className="profile-picture-container">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces"
                  alt="Profile"
                  className="profile-picture"
                />
                <div className="online-indicator"></div>
              </div>
              <div>
                <h2 className="user-name">Sarah Johnson</h2>
                <p className="user-status">Online</p>
              </div>
            </div>
            <div className="header-actions">
              <button className="icon-button">
                <Video size={20} />
              </button>
              <button className="icon-button">
                <Phone size={20} />
              </button>
              <button className="icon-button">
                <MoreVertical size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="chat-area">
        <div className="chat-container">
          {Messages.map((message:any,index:number) => (
            <div
              key={index}
              className={`message-wrapper ${message.send ? 'sent' : 'received'}`}
            >
              <div className="message-bubble">
                <p className="message-text">{message.text}</p>
                <p className="message-timestamp">{message.timestamp}</p>
              </div>
            </div>
          ))}
          
        </div>
      </div>

      <div className="input-area">
        <div className="input-container">
          <div className="input-wrapper">
            <button className="icon-button">
              <Smile size={24} />
            </button>
            <button className="icon-button">
              <Paperclip size={24} />
            </button>
            <textarea
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              value={message}
              placeholder="Type a message"
              className="message-input"
              rows={1}
            />
            <button
              onClick={handleSend}
              onTouchStart={handleTouchSend}
              className="send-button"
            >
              <Send size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;