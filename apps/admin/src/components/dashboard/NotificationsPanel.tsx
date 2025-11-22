'use client';

import React, { useState } from 'react';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Paper,
    TextField,
    Typography,
} from '@mui/material';

interface Notification {
    id: number;
    text: string;
    file?: string;
    groups: string[];
}

const groupsOptions = ['خریداران', 'فروشندگان', 'پشتیبانی'];

const NotificationsPanel: React.FC = () => {
    const [message, setMessage] = useState('');
    const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [editingId, setEditingId] = useState<number | null>(null);

    const handleGroupChange = (group: string) => {
        setSelectedGroups(prev =>
            prev.includes(group)
                ? prev.filter(g => g !== group)
                : [...prev, group]
        );
    };

    const handleSend = () => {
        if (!message.trim() && !file) return;
        if (!selectedGroups.length) return;

        if (editingId !== null) {
            setNotifications(prev =>
                prev.map(n =>
                    n.id === editingId
                        ? { ...n, text: message, file: file?.name, groups: selectedGroups }
                        : n
                )
            );
            setEditingId(null);
        } else {
            setNotifications(prev => [
                { id: Date.now(), text: message, file: file?.name, groups: selectedGroups },
                ...prev,
            ]);
        }

        setMessage('');
        setFile(null);
        setSelectedGroups([]);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) setFile(e.target.files[0]);
    };

    const handleEdit = (notif: Notification) => {
        setMessage(notif.text);
        setFile(notif.file ? new File([], notif.file) : null);
        setSelectedGroups(notif.groups);
        setEditingId(notif.id);
    };

    const handleDelete = (id: number) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    return (
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
            <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    انتخاب گروه دریافت‌کنندگان
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
                    {groupsOptions.map(group => (
                        <FormControlLabel
                            key={group}
                            control={
                                <Checkbox
                                    checked={selectedGroups.includes(group)}
                                    onChange={() => handleGroupChange(group)}
                                />
                            }
                            label={group}
                        />
                    ))}
                </Box>

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
                        {editingId !== null ? 'ویرایش' : 'ارسال'}
                    </Button>
                </Box>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <List sx={{ maxHeight: 300, overflowY: 'auto' }}>
                {notifications.length === 0 && (
                    <Typography variant="body2" color="text.secondary" align="center">
                        هنوز اعلانی ارسال نشده است
                    </Typography>
                )}
                {notifications.map((n) => (
                    <ListItem
                        key={n.id}
                        sx={{
                            borderRadius: 2,
                            mb: 1,
                            boxShadow: 1,
                            '&:hover': { boxShadow: 3, backgroundColor: '#f9f9f9' },
                            flexDirection: 'column',
                            alignItems: 'flex-start'
                        }}
                    >
                        <ListItemText
                            primary={n.text}
                            secondary={
                                <>
                                    {n.file && <Typography variant="caption">ضمیمه: {n.file}</Typography>}
                                    <Typography variant="caption">گروه‌ها: {n.groups.join(', ')}</Typography>
                                </>
                            }
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" onClick={() => handleEdit(n)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton edge="end" onClick={() => handleDelete(n.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default NotificationsPanel;
