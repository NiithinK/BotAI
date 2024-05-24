// FeedbackForm.jsx
import React, { useState, useContext } from 'react';
import { Button, TextField, Box, Typography, Modal } from '@mui/material';
import { ChatContext } from '../contexts/ChatContext';

const FeedbackForm = ({ open, handleClose, onSave }) => {
    const { feedback, setFeedback } = useContext(ChatContext);
    const [comments, setComments] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const newFeedback = { comments };
        onSave(newFeedback);
        setComments('');
        handleClose(); // Close the form after saving feedback
        console.log(newFeedback)
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
                <Typography variant="h6">Provide Feedback</Typography>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Leave your comments here"
                    margin="normal"
                />
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Save Feedback
                </Button>
            </Box>
        </Modal>
    );
};

export default FeedbackForm;
