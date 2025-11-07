'use client';

import React, { useState } from 'react';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import {
    Box,
    Button,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Paper,
    TextField,
    Typography,
} from '@mui/material';

const NotificationsPanel: React.FC = () => {
    const [message, setMessage] = useState('');
    const [notifications, setNotifications] = useState<{ text: string; file?: string }[]>([]);
    const [file, setFile] = useState<File | null>(null);

    const handleSend = () => {
        if (!message.trim() && !file) return;
        setNotifications(prev => [
            { text: message, file: file?.name },
            ...prev,
        ]);
        setMessage('');
        setFile(null);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>

            <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
                <TextField
                    label="متن اعلان"
                    fullWidth
                    multiline
                    minRows={2}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />
                <input
                    type="file"
                    id="file-upload"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                <IconButton
                    color={file ? 'primary' : 'default'}
                    component="label"
                    htmlFor="file-upload"
                >
                    <AttachFileIcon />
                </IconButton>
                <Button
                    variant="contained"
                    onClick={handleSend}
                    sx={{ whiteSpace: 'nowrap' }}
                >
                    ارسال
                </Button>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <List sx={{ maxHeight: 300, overflowY: 'auto' }}>
                {notifications.length === 0 && (
                    <Typography variant="body2" color="text.secondary" align="center">
                        هنوز اعلانی ارسال نشده است
                    </Typography>
                )}
                {notifications.map((n, i) => (
                    <ListItem
                        key={i}
                        sx={{
                            borderRadius: 2,
                            mb: 1,
                            boxShadow: 1,
                            '&:hover': { boxShadow: 3, backgroundColor: '#f9f9f9' },
                        }}
                    >
                        <ListItemText
                            primary={n.text}
                            secondary={n.file ? `ضمیمه: ${n.file}` : null}
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default NotificationsPanel;
