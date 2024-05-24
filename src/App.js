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
                 {/* <ThemeToggle> */}
                <Routes>
                {/* <Route  path="/" component={Home} /> */}
                   
                    <Route path="/history" element={<ConversationList />} />
                    <Route path="/" element={<Chat />} />
                    
                </Routes>
                  {/* </ThemeToggle> */}
              </ChatProvider>
            </Router>
);

export default App;

// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Chat from './components/Chat';
// import FeedbackTable from './components/FeedbackTable';
// import ConversationList from './components/ConversationList';
// import { ChatProvider } from './contexts/ChatContext';
// import Home from './pages/Home';
// import ConversationDetail from './components/ConversationDetail';
// import Sidebar from './components/sidebar';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { CssBaseline } from '@mui/material';

// const App = () => {
//     const [darkMode, setDarkMode] = useState(false);

//     const theme = createTheme({
//         palette: {
//             mode: darkMode ? 'dark' : 'light',
//         },
//     });

//     return (
//         <ThemeProvider theme={theme}>
//             <CssBaseline />
//             <Router>
//                 <ChatProvider>
//                     <Sidebar setDarkMode={setDarkMode} darkMode={darkMode} />
//                     <Routes>
//                         <Route path="/" element={<Chat />} />
//                         <Route path="/feedback" element={<FeedbackTable />} />
//                         <Route path="/history" element={<ConversationList />} />
//                         <Route path="/conversations/:id" element={<ConversationDetail />} />
//                     </Routes>
//                 </ChatProvider>
//             </Router>
//         </ThemeProvider>
//     );
// };

// export default App;
