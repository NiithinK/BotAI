import React, { useContext, useEffect } from 'react';
import { ChatContext } from '../contexts/ChatContext';
import { Paper, Typography, Box,IconButton, Button } from '@mui/material';
import Sidebar from './sidebar';
import Rating from '@mui/material/Rating';

import { useNavigate } from 'react-router-dom';
import { IoArrowBackCircle } from "react-icons/io5";
const PastConversations = () => {
    const { conversations, setConversations } = useContext(ChatContext);
    const navigate = useNavigate();
    useEffect(() => {
        const savedConversations = JSON.parse(localStorage.getItem('conversations'));
        if (savedConversations) {
            setConversations(savedConversations);
        }
    }, [setConversations]);
    const handleCLear = () =>{
        localStorage.clear();
    }
    return (
        <>
        
        <div style={{ padding: '24px',marginLeft:'25px' }}>
       
            <Typography variant="h4" sx={{ marginBottom: '10px',marginLeft:'10px', fontWeight: '700', fontSize: '26px', color: '#9785BA' }}>
            <IconButton onClick={() => navigate('/')} sx={{ marginBottom: '1em' }}>
                <IoArrowBackCircle />
            </IconButton>
            Past Conversations
            <Button onClick={handleCLear}>Clear</Button>
            </Typography>
            {conversations.map((conversation, index) => (
                <Paper key={index} style={{ padding: '1em', marginBottom: '1em', background: 'linear-gradient(90deg, #BFACE2 0%, #D7C7F4 100%)'}}>
                    {conversation.messages.map((msg, msgIndex) => (
                        <Box key={msgIndex} sx={{ width: '100%', mb: 1 }}>
                            {/* <Paper sx={{ p: 2, background: '#D7C7F421', maxWidth: '70%' }}> */}
                                <Typography variant="body1" sx={{ fontWeight: 'Bolder' }}>{msg.sender === 'user' ? 'You:' : 'Soul AI:'}</Typography>
                                <Typography variant="body1">{msg.text}</Typography>
                            {/* </Paper> */}
                        </Box>
                    ))}
                    <Typography variant="body2" color="Black">Rating: </Typography>
                    <Rating
                        name="text-feedback"
                        value={conversation.rating}
                        readOnly
                        precision={0.5}/>
                    
                   
                    <Typography variant="body2" color="Black">FeedBack: {conversation.Comment.comments}</Typography>
                </Paper>
            ))}
        </div>
        </>
    );
};

export default PastConversations;
