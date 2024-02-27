import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import ChatRoom from './components/ChatRoom';

function App() {
    const [currentChatroomId, setCurrentChatroomId] = useState(null);

    const handleSelectChatroom = (chatroomId) => {
        setCurrentChatroomId(chatroomId);
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Express.js Whatsapp_240223</h1>
            </header>
            <main className="App-content">
                <Sidebar onSelectChatroom={handleSelectChatroom} />
                {currentChatroomId && <ChatRoom chatroomId={currentChatroomId} />}
            </main>
        </div>
    );
}

export default App;
