// src/contexts/ChatContext.js
import React, { createContext, useState } from 'react';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [conversations, setConversations] = useState([]);
    const [feedback, setFeedback] = useState([]);
    console.log(conversations,feedback)
    return (
        <ChatContext.Provider value={{ conversations, setConversations, feedback, setFeedback }}>
            {children}
        </ChatContext.Provider>
    );
};

export { ChatContext, ChatProvider };
