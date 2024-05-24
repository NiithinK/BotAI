// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chat from './components/Chat';

import ConversationList from './components/ConversationList';
import ThemeToggle from './components/ThemeToggle';
import { ChatProvider } from './contexts/ChatContext';


const App = () => (
    
            <Router>
              <ChatProvider>
                <Routes>
                  <Route path="/history" element={<ConversationList />} />
                    <Route path="/" element={<Chat />} />
                  </Routes>
               </ChatProvider>
            </Router>
);

export default App;
