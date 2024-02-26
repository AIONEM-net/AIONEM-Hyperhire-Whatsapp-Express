import React from 'react';

function MessageList({ messages }) {
    return (
        <div className="message-list">
            {messages.map((message, index) => (
                <div key={index} className="message">
                    {/* This is a simplification. Depending on your message structure,
              you might display sender info, timestamps, etc. */}
                    {message.type === 'text' && <p>{message.content}</p>}
                    {message.type === 'image' && <img src={message.content} alt="attachment" />}
                    {message.type === 'video' && <video controls src={message.content} />}
                    {/* Expand this as needed for other message types */}
                </div>
            ))}
        </div>
    );
}

export default MessageList;
