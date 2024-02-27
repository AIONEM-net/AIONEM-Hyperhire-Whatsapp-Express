import React from 'react';

function MessageList({ messages }) {
    return (
        <div className="message-list">
            {messages.map(function (message, index) {
                console.log(message);
                return <div key={index} className="message">
                    <div className={"message-content"}>
                        {<p>{message.content}</p>}
                        {message.type === 'image' && <img src={message.content} alt="attachment"/>}
                        {message.type === 'video' && <video controls src={message.content}/>}
                    </div>
                </div>;
            })}
        </div>
    );
}

export default MessageList;
