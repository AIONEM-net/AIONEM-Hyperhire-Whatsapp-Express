import React, { useState } from 'react';
import EmojiPicker from './EmojiPicker';

function MessageForm({ onSendMessage }) {
    const [message, setMessage] = useState('');

    const handleEmojiClick = (event, emojiObject) => {
        setMessage((prevMessage) => prevMessage + emojiObject.emoji);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!message.trim()) return;
        onSendMessage(message);
        setMessage('');
    };

    return (
        <form onSubmit={handleSubmit}>
      <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
      ></textarea>
            <EmojiPicker onEmojiClick={handleEmojiClick} />
            <button type="submit">Send</button>
        </form>
    );
}

export default MessageForm;
