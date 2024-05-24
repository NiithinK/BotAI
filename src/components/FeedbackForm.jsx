// FeedbackForm.jsx
import React, { useState, useContext } from 'react';
import { Button, TextField, Box, Typography, Modal } from '@mui/material';
import { ChatContext } from '../contexts/ChatContext';
import { RiLightbulbLine } from "react-icons/ri";
const FeedbackForm = ({ open, handleClose, onSave }) => {
    const { feedback, setFeedback } = useContext(ChatContext);
    const [comments, setComments] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const newFeedback = { comments };
        onSave(newFeedback);
        setComments('');
        handleClose(); // Close the form after saving feedback
       
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 1,
                }}
            >
                <Typography variant="h6" > < RiLightbulbLine />  Provide additional feedback</Typography>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                   
                    margin="normal"
                />
                <Button variant="contained"  style={{display:'flex',marginLeft:'auto',background: '#D7C7F4',color:'black'}} onClick={handleSubmit}>
                    Save Feedback
                </Button>
            </Box>
        </Modal>
    );
};

export default FeedbackForm;
