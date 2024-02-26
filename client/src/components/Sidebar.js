import React, { useState, useEffect } from 'react';
// Import the API service if you're fetching chatrooms from your backend
// import api from '../services/api';

function Sidebar({ onSelectChatroom }) {
    const [chatrooms, setChatrooms] = useState([]);

    useEffect(() => {
        // Placeholder for fetching chatroom list from your backend
        // This should call an API endpoint and update the state with the retrieved chatrooms
        // Example: api.getChatrooms().then(setChatrooms);
        const mockChatrooms = [
            { id: 1, name: 'Chatroom 1' },
            { id: 2, name: 'Chatroom 2' },
            // Add more mock chatrooms as needed
        ];
        setChatrooms(mockChatrooms);
    }, []);

    return (
        <div className="sidebar">
            <h3>Chatrooms</h3>
            <ul>
                {chatrooms.map((chatroom) => (
                    <li key={chatroom.id} onClick={() => onSelectChatroom(chatroom.id)}>
                        {chatroom.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
