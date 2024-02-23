// Notification.js
import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Notification = ({ open, message, severity, onClose }) => {
    return (
        <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
            <MuiAlert elevation={6} variant="filled" severity={severity}>
                {message}
            </MuiAlert>
        </Snackbar>
    );
};

export default Notification;
