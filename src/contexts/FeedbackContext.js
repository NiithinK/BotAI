// src/contexts/FeedbackContext.js
import React, { createContext, useState } from 'react';

const FeedbackContext = createContext();

 const FeedbackProvider = ({ children }) => {
    const [feedbacks, setFeedbacks] = useState([]);

    // const addFeedback = (newFeedback) => {
    //     setFeedbacks([...feedbacks, newFeedback]);
    // };

    return (
        <FeedbackContext.Provider value={{ feedbacks,setFeedbacks}}>
            {children}
        </FeedbackContext.Provider>
    );
};
export {FeedbackContext , FeedbackProvider}