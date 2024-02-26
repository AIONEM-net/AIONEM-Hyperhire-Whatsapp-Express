import React, { createContext, useContext, useState } from 'react';

// Step 1: Create the context
const ChatContext = createContext();

// Step 2: Create a provider component
export const ChatProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null); // Current logged-in user
    const [currentChatroom, setCurrentChatroom] = useState(null); // Currently selected chatroom
    const [messages, setMessages] = useState([]); // Messages in the selected chatroom

    // Add more state management logic as needed

    // The value that will be supplied to consumers of this context
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

// Step 3: Create custom hooks for consuming the context
export const useChat = () => {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
};
