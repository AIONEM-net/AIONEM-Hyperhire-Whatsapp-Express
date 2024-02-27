import React, { useState, useEffect } from 'react';
import MessageForm from './MessageForm';
import MessageList from './MessageList';
import api from "../services/api";

function ChatRoom({ chatroomId }) {

    const [messages, setMessages] = useState([
        {
            id: 1,
            userId: 1,
            chatroomId: chatroomId,
            content: "This is the first test message.",
            sent: true,
        },
        {
            id: 2,
            userId: 1,
            chatroomId: chatroomId,
            content: "This is the second test message.",
            sent: true,
        },
    ]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const fetchedMessages = await api.fetchMessages(chatroomId);
                setMessages(fetchedMessages);
            } catch (error) {
                console.error("Failed to fetch messages:", error);
            }
        };

        fetchMessages();
    }, [chatroomId]);

    const sendMessage = async (messageContent) => {
        const tempMessageId = Date.now();
        const tempMessage = {
            id: tempMessageId,
            userId: 1,
            chatroomId: chatroomId,
            content: messageContent,
            sent: true,
        };

        setMessages(prevMessages => [...prevMessages, tempMessage]);

        try {
            const messageData = {
                userId: 1,
                chatroomId: chatroomId,
                content: messageContent,
            };
            const newMessage = await api.sendMessage(messageData);

            setMessages(prevMessages =>
                prevMessages.map(msg => (msg.id === tempMessageId ? newMessage : msg))
            );

        } catch (error) {
            console.error("Failed to send message:", error);
            setMessages(prevMessages =>
                prevMessages.map(msg =>
                    msg.id === tempMessageId ? { ...msg, sent: false } : msg
                )
            );
        }
    };

    return (
        <div className="chat-room">
            <h2>Chat {chatroomId}</h2>
            <MessageList messages={messages} />
            <MessageForm onSendMessage={(messageContent) => sendMessage(messageContent)} />
        </div>
    );
}

export default ChatRoom;
