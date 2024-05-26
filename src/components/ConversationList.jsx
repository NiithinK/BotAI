

import React, { useContext, useEffect, useState } from 'react';
import { ChatContext } from '../contexts/ChatContext';
import { Paper, Typography, Box, IconButton, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import Sidebar from './sidebar';
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackCircle } from "react-icons/io5";
 import useMediaQuery from '@mui/material/useMediaQuery';

const PastConversations = () => {
    const { conversations, setConversations } = useContext(ChatContext);
    const [filteredConversations, setFilteredConversations] = useState([]);
    const [filterRating, setFilterRating] = useState('');
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width:600px)');

    useEffect(() => {
        const savedConversations = JSON.parse(localStorage.getItem('conversations'));
        if (savedConversations) {
            setConversations(savedConversations);
        }
    }, [setConversations]);

    useEffect(() => {
        if (filterRating) {
            setFilteredConversations(conversations.filter(conv => conv.rating === parseFloat(filterRating)));
        } else {
            setFilteredConversations(conversations);
        }
    }, [conversations, filterRating]);

    const handleClear = () => {
        localStorage.clear();
        setConversations([]);
        setFilteredConversations([]);
    };

    return (
        <>
            <Sidebar/>
            <div style={{ padding: '24px', marginLeft: '25px', background: 'linear-gradient(180deg, rgba(215, 199, 244, 0.2) 0%, rgba(151, 133, 186, 0.2) 100%)'}}>
            <IconButton onClick={() => navigate('/')} sx={{ marginBottom: '1em',marginLeft: isMobile ? 0 : 25,marginTop:isMobile ? 5 : 0  }}>
                        <IoArrowBackCircle /> Back
                    </IconButton>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <Typography variant="h4" sx={{ marginBottom: '10px', marginLeft: '10px', fontWeight: '700', fontSize: '26px', color: '#9785BA' }}>
                   
                Conversation History
                    <Button onClick={handleClear} sx={{ marginLeft: '30px', background: '#D7C7F4',color:'black'}}>Clear History</Button>
                </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <FormControl sx={{ marginBottom: '20px', minWidth: 200 }}>
                    <InputLabel id="rating-filter-label"> Rating</InputLabel>
                    <Select
                        labelId="rating-filter-label"
                        id="rating-filter"
                        value={filterRating}
                        label="Rating"
                        onChange={(e) => setFilterRating(e.target.value)}
                        sx={{ color: 'black' }}
                    >
                        <MenuItem value=""><em>All</em></MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        
                        <MenuItem value={4}>4</MenuItem>
                        
                        <MenuItem value={3}>3</MenuItem>
                      
                        <MenuItem value={2}>2</MenuItem>
                      
                        <MenuItem value={1}>1</MenuItem>
                        
                    </Select>
                </FormControl>
                </Box>
                {filteredConversations.map((conversation, index) => (
                    <Paper key={index} style={{ marginLeft: isMobile ? 0 : 25,padding: '1em', marginBottom: '1em', background: 'linear-gradient(90deg, #BFACE2 0%, #D7C7F4 100%)' }}>
                        {conversation.messages.map((msg, msgIndex) => (
                            <Box key={msgIndex} sx={{ marginLeft: isMobile ? 0 : 25, mb: 1, display: 'flex', alignItems: 'center' }}>
                                <Typography variant="body1" sx={{ fontWeight: 'bolder', marginRight: '10px' }}>
                                    {msg.sender === 'user' ? 'You:' : 'Soul AI:'}
                                </Typography>
                                <Typography variant="body1">{msg.text}</Typography>
                            </Box>
                        ))}
                        <Typography variant="body2" color="Black" sx={{marginLeft: isMobile ? 0 : 25}}>Rating: </Typography>
                        <Rating
                            name="text-feedback"
                            value={conversation.rating}
                            readOnly
                            precision={0.5}
                            sx={{marginLeft: isMobile ? 0 : 25}}
                        />
                        <Typography variant="body2" color="Black" sx={{marginLeft: isMobile ? 0 : 25}}>Feedback: {conversation.Comment.comments}</Typography>
                    </Paper>
                ))}
            </div>
        </>
    );
};

export default PastConversations;
