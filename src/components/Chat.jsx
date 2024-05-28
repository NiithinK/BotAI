import { IoMdThumbsUp, IoMdThumbsDown } from "react-icons/io";
import React, { useState, useContext, useEffect } from 'react';
import { ChatContext } from '../contexts/ChatContext';
import FeedbackForm from './FeedbackForm';
import aiResponses from '../data/aiResponses.json';
import { Button, TextField, Typography, Paper, IconButton, Box, Rating, Grid } from '@mui/material';
import Sidebar from './sidebar';
import logo from '../assets/image 29.png';
import you from '../assets/you.png';
import useMediaQuery from "@mui/material/useMediaQuery";
import ThemeToggle from "./ThemeToggle";

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
        <Grid container sx={{ height: '100vh', background: 'linear-gradient(180deg, rgba(215, 199, 244, 0.2) 0%, rgba(151, 133, 186, 0.2) 100%)' }}>
            <Sidebar />
            <Grid item xs={12} md={9} lg={10} sx={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h4" sx={{ marginBottom: '20px', fontWeight: '700', fontSize: '26px', color: '#9785BA', marginTop: '25px', textAlign: 'left', marginLeft: isMobile ? 0 : 30 }}>
                    Bot AI
                </Typography>
                <Box sx={{ flex: 1, overflowY: 'auto', paddingBottom: '120px',marginLeft: isMobile ? 0 : 30 }}>
                    {currentConversation.map((msg, index) => (
                        <Box key={index} sx={{ width: '100%', mb: 1 }}>
                            <Paper sx={{ p: 2, background: '#D7C7F421', width: isMobile ? '90%' : '95%', marginLeft: isMobile ? '5%' : '2.5%' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <img src={msg.sender === 'user' ? you : logo} alt="" style={{ marginRight: '10px' }} />
                                    <Box>
                                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{msg.sender === 'user' ? 'You' : 'Soul AI'}:</Typography>
                                        <Typography variant="body1">{msg.text}</Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography variant="caption" sx={{ display: 'block' }}>{msg.time}</Typography>
                                            {msg.sender === 'ai' && (
                                                <>
                                                    <IconButton color="primary" onClick={() => handleFeedback(index, 'thumbs-up')}>
                                                        <IoMdThumbsUp color="grey" />
                                                    </IconButton>
                                                    <IconButton color="primary" onClick={() => handleOpenFeedbackForm(index)}>
                                                        <IoMdThumbsDown color="grey" />
                                                    </IconButton>
                                                </>
                                            )}
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
                    ))}
                </Box>
                <Box sx={{ position: 'fixed', bottom: 0, left: isMobile ? 0 : 240, width: isMobile ? '100%' : `calc(100% - ${240}px)`, backgroundColor: '#fff', padding: '10px', boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TextField
                        fullWidth
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        sx={{ width: '70%', backgroundColor: '#fff', borderRadius: '4px' }}
                    />
                    <Button variant="contained" sx={{ margin: '10px', padding: '10px', backgroundColor: '#D7C7F4', color: 'black', minWidth: isMobile ? '10%' : '15%' }} onClick={handleSend}>
                        Ask
                    </Button>
                    <Button variant="contained" sx={{ margin: '10px', padding: '10px', backgroundColor: '#D7C7F4', color: 'black', minWidth: isMobile ? '10%' : '15%' }} onClick={handleSaveConversation}>
                        Save
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Chat;
