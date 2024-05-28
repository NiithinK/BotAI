// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chat from './components/Chat';
import './App.css'
import ConversationList from './components/ConversationList';
import ThemeToggle from './components/ThemeToggle';
import { ChatProvider } from './contexts/ChatContext';

function App(){
    return(

     <div className='App'>

             <Router>
                <ThemeToggle>
                <ChatProvider>
                  <Routes>
                    <Route path="/history" element={<ConversationList />} />
                      <Route path="/" element={<Chat />} />
                    </Routes>
                </ChatProvider>
                </ThemeToggle>
              </Router>
     </div>
    )
  };

export default App;
