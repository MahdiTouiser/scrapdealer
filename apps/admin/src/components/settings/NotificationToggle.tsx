'use client';
import React, { useState } from 'react';

import {
  FormControlLabel,
  FormGroup,
  Switch,
} from '@mui/material';

const NotificationToggle: React.FC = () => {
    const [enabled, setEnabled] = useState(true);
    return (
        <FormGroup>
            <FormControlLabel
                control={
                    <Switch
                        checked={enabled}
                        onChange={() => setEnabled(!enabled)}
                        color="primary"
                    />
                }
                label={enabled ? 'اعلان‌ها فعال است' : 'اعلان‌ها غیرفعال است'}
            />
        </FormGroup>
    );
};

export default NotificationToggle;
