import React, { useState } from 'react';

function MessageForm({ onSendMessage }) {
    const [message, setMessage] = useState('');
    const [file, setFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!message.trim() && !file) return;

        // Construct a form data to include the file if it exists
        const formData = new FormData();
        formData.append('message', message.trim());
        if (file) {
            formData.append('file', file);
        }

        // Call the onSendMessage prop, which could be an API call or WebSocket send method
        onSendMessage(formData);

        // Reset message input and file after sending
        setMessage('');
        setFile(null);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <form className="message-form" onSubmit={handleSubmit}>
      <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          rows="3"
      ></textarea>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Send</button>
        </form>
    );
}

export default MessageForm;
