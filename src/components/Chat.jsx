// Chat.jsx
import { IoMdThumbsUp, IoMdThumbsDown } from "react-icons/io";
import React, { useState, useContext, useEffect } from 'react';
import { ChatContext } from '../contexts/ChatContext';
import FeedbackForm from './FeedbackForm';
import aiResponses from '../data/aiResponses.json';
import { Button, TextField, Typography, Paper, IconButton, Box, Rating } from '@mui/material';
import Sidebar from './sidebar';
import logo from '../assets/image 29.png';
import you from '../assets/you.png';
import useMediaQuery from "@mui/material/useMediaQuery";
const Chat = () => {
    const { conversations, setConversations } = useContext(ChatContext);
    const [input, setInput] = useState('');
    const [currentConversation, setCurrentConversation] = useState([]);
    const [openFeedbackIndex, setOpenFeedbackIndex] = useState(null);
    const [feedbacks, setFeedbacks] = useState([]);
    const [rating, setRating] = useState(0);
    const [feedbackText, setFeedbackText] = useState('');
    const isMobile = useMediaQuery('(max-width:600px)');


    useEffect(() => {
        const savedConversations = JSON.parse(localStorage.getItem('conversations'));
        if (savedConversations) {
            setConversations(savedConversations);
        }
    }, [setConversations]);

    const findResponse = (question) => {
        const found = aiResponses.find(q => q.question.toLowerCase() === question.toLowerCase());
        return found ? found.response : "I don’t understand.";
    };

    const handleSend = () => {
        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const userMessage = { sender: 'user', text: input, time: currentTime };
        const aiMessage = { sender: 'ai', text: findResponse(input), time: currentTime };
        const newConversation = [...currentConversation, userMessage, aiMessage];
        setCurrentConversation(newConversation);
        setInput('');
    };

    const handleFeedback = (index, feedback) => {
        const newFeedbacks = [...feedbacks];
        newFeedbacks[index] = feedback;
        setFeedbacks(newFeedbacks);
    };

    const handleOpenFeedbackForm = (index) => {
        setOpenFeedbackIndex(index);
    };

    const handleCloseFeedbackForm = () => {
        setOpenFeedbackIndex(null);
    };

    const handleSaveConversation = (onSave) => {
        const newConversations = [...conversations, { messages: currentConversation, rating, Comment: onSave }];
        setConversations(newConversations);
        localStorage.setItem('conversations', JSON.stringify(newConversations));
    };

    return (
        <div style={{ display: 'flex', height: '100vh', background: 'linear-gradient(180deg, rgba(215, 199, 244, 0.2) 0%, rgba(151, 133, 186, 0.2) 100%)' }}>
            <Sidebar />
            <div style={{ flexGrow: 1, padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '120px' }}>
                    <Typography variant="h4" sx={{ marginBottom: '20px', fontWeight: '700', fontSize: '26px', color: '#9785BA', marginTop: '25px', textAlign: isMobile ? 'center' : 'left',  marginLeft: isMobile ? 0 : 100 }}>
                        Bot AI
                    </Typography>
                    <Paper style={{ padding: '1em', marginBottom: '1em', background: 'linear-gradient(180deg, rgba(215, 199, 244, 0.2) 0%, rgba(151, 133, 186, 0.2) 100%)',marginLeft: isMobile ? 0 : 240 }}>
                        {currentConversation.map((msg, index) => (
                            <div key={index}>
                                {msg.sender === 'user' ? (
                                    <Box sx={{ width: '100%', mb: 1 }}>
                                        <Paper sx={{ p: 2, background: '#D7C7F421', width: isMobile ? '90%' : '95%',  }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <img src={you} alt="" style={{ marginRight: '10px' }} />
                                                <Box>
                                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>You:</Typography>
                                                    <Typography variant="body1">{msg.text}</Typography>
                                                    <Typography variant="caption" sx={{ display: 'block' }}>{msg.time}</Typography>
                                                </Box>
                                            </Box>
                                        </Paper>
                                    </Box>
                                ) : (
                                    <Box sx={{ width: '100%', mb: 1, background: '#D7C7F421' }}>
                                        <Paper sx={{ p: 2, background: '#D7C7F421', width: isMobile ? '90%' : '95%', }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <img src={logo} style={{ borderRadius: '50%', marginRight: '10px' }} alt="" />
                                                <Box>
                                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Soul AI:</Typography>
                                                    <Typography variant="body1">{msg.text}</Typography>
                                                    <Box sx={{display:'flex',marginTop:'3px'}}>
                                                    <Typography variant="caption" sx={{ display: 'block' }}>{msg.time}</Typography>
                                                    <IconButton color="primary" onClick={() => handleFeedback(index, 'thumbs-up')}>
                                                        <IoMdThumbsUp color="grey" />
                                                    </IconButton>
                                                    <IconButton color="primary" onClick={() => handleOpenFeedbackForm(index)}>
                                                        <IoMdThumbsDown color="grey" />
                                                    </IconButton>
                                                    </Box>
                                                    {feedbacks[index] === 'thumbs-up' && (
                                                        <Typography variant="body2" color="primary">
                                                            <Rating
                                                                name="rating"
                                                                value={rating}
                                                                onChange={(e, newValue) => setRating(newValue)}
                                                            />
                                                        </Typography>
                                                    )}
                                                    {openFeedbackIndex === index && (
                                                        <FeedbackForm
                                                            open={openFeedbackIndex !== null}
                                                            handleClose={handleCloseFeedbackForm}
                                                            onSave={handleSaveConversation}
                                                        />
                                                    )}
                                                </Box>
                                            </Box>
                                        </Paper>
                                    </Box>
                                )}
                            </div>
                        ))}
                    </Paper>
                </div>
                <div style={{ position: 'fixed', bottom: 0, left: isMobile ? 0 : 240, width: isMobile ? '100%' : '90%', backgroundColor: '#fff', padding: '10px', boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)' }}>
                    <TextField
                        fullWidth
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        sx={{ width: isMobile ? '60%' : '80%', background: 'white' }}
                    />
                    <Button variant="contained" color="primary" sx={{ margin: '10px', padding: '10px', background: '#D7C7F4', color: 'black', width: '5%' }} onClick={handleSend}>
                        Ask
                    </Button>
                    <Button variant="contained" color="primary" sx={{ margin: '10px', padding: '10px', background: '#D7C7F4', color: 'black', width: '5%' }} onClick={handleSaveConversation}>
                        Save
                    </Button>
                </div>
            </div>
        </div>
    )
};

export default Chat;
