// src/pages/Messages.js

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { db, auth } from '../services/firebase'; // Updated import
import '../styles/Messages.css'; // Custom styles if needed

function Messages() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { conversationId } = useParams(); // Assuming each conversation has a unique ID
  const messagesEndRef = useRef(null);

  // Fetch messages in real-time
  useEffect(() => {
    const unsubscribe = db
      .collection('conversations')
      .doc(conversationId)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });

    return unsubscribe;
  }, [conversationId]);

  // Scroll to the bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send a new message
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (newMessage.trim()) {
      const user = auth.currentUser; // Use the auth object from Firebase to get the current user
      const senderId = user ? user.uid : 'guest'; // Default to 'guest' if no user is logged in

      await db.collection('conversations').doc(conversationId).collection('messages').add({
        text: newMessage,
        timestamp: new Date(),
        senderId,
      });

      setNewMessage('');
    }
  };

  return (
    <div className="messages">
      <h2>Chat</h2>

      <div className="messages-list">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.senderId === 'userId' ? 'my-message' : 'other-message'}`}
          >
            <p>{message.text}</p>
            <span className="message-timestamp">
              {new Date(message.timestamp.seconds * 1000).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>

      <div ref={messagesEndRef} />
      
      <form onSubmit={handleSendMessage} className="message-form">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Messages;
