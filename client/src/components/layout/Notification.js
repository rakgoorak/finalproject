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

<<<<<<< HEAD
export default Notification;
=======
export default Notification;
>>>>>>> 8250aa1fe700d4334b1c9adfef53bc6c1a0e526d
