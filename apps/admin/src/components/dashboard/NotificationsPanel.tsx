'use client';

import React, { useState } from 'react';

import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  TextField,
} from '@mui/material';

const NotificationsPanel: React.FC = () => {
    const [message, setMessage] = useState('');
    const [notifications, setNotifications] = useState<string[]>([]);

    const handleSend = () => {
        if (!message.trim()) return;
        setNotifications(prev => [message, ...prev]);
        setMessage('');
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                    label="متن اعلان"
                    fullWidth
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />
                <Button variant="contained" onClick={handleSend}>ارسال</Button>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <List>
                {notifications.map((n, i) => (
                    <ListItem key={i}>
                        <ListItemText primary={n} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default NotificationsPanel;
