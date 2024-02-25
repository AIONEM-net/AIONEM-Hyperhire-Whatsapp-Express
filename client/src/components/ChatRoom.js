import React, { useState, useEffect } from 'react';
import MessageForm from './MessageForm';
import MessageList from './MessageList';
// Import socketService if you're using WebSocket for real-time communication

function ChatRoom({ chatroomId }) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Fetch messages for the chatroomId from your API and update state
        // This is a placeholder for fetching messages logic
        // You might use the `api.js` service you created to fetch messages
        // Example: api.fetchMessages(chatroomId).then(setMessages);
    }, [chatroomId]);

    // Function to handle sending a new message
    // This should include updating the local state and possibly sending the message via WebSocket
    const sendMessage = (newMessage) => {
        // Placeholder for sending a message logic
        setMessages([...messages, newMessage]);
        // If using WebSocket, you would emit the new message here
        // Example: socketService.sendMessage(newMessage);
    };

    return (
        <div className="chat-room">
            <h2>Chat Room {chatroomId}</h2> {/* Display chat room's name or ID */}
            <MessageList messages={messages} />
            <MessageForm onSendMessage={sendMessage} />
        </div>
    );
}

export default ChatRoom;
