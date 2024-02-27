import React, { useState } from 'react';

function MessageForm({ onSendMessage }) {
    const [message, setMessage] = useState('');
    const [file, setFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!message.trim() && !file) return;

        const formData = new FormData();
        formData.append('message', message.trim());
        if (file) {
            formData.append('file', file);
        }

        onSendMessage(formData);

        setMessage('');
        setFile(null);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <form className="message-form" onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange}/>
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                rows="3"
            ></textarea>
            <button type="submit">Send</button>
        </form>
    );
}

export default MessageForm;
