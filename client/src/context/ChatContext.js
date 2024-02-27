import React, { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [currentChatroom, setCurrentChatroom] = useState(null);
    const [messages, setMessages] = useState([]);

    const value = {
        currentUser,
        setCurrentUser,
        currentChatroom,
        setCurrentChatroom,
        messages,
        setMessages,
    };

    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = () => {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
};
