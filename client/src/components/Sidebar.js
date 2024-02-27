import React, { useState, useEffect } from 'react';

function Sidebar({ onSelectChatroom }) {
    const [chatrooms, setChatrooms] = useState([]);
    const [activeChatroomId, setActiveChatroomId] = useState(null);

    useEffect(() => {
        const mockChatrooms = [
            { id: 1, name: 'Lalande' },
            { id: 2, name: 'Alain' },
        ];
        setChatrooms(mockChatrooms);
    }, []);

    const handleSelectChatroom = (id) => {
        onSelectChatroom(id);
        setActiveChatroomId(id);
    };

    return (
        <div className="sidebar">
            <h3>Chats</h3>
            <ul>
                {chatrooms.map((chatroom) => (
                    <li
                        key={chatroom.id}
                        onClick={() => handleSelectChatroom(chatroom.id)}
                        className={chatroom.id === activeChatroomId ? 'active' : ''}
                    >
                        {chatroom.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
