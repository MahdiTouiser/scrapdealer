'use client';

import React, { useState } from 'react';

import {
  Box,
  Button,
  Slider,
  Typography,
} from '@mui/material';

const CommissionControl: React.FC = () => {
    const [commission, setCommission] = useState(3);

    const handleSave = () => {
        alert(`درصد کمیسیون به ${commission}% تغییر کرد`);
    };

    return (
        <Box>
            <Typography gutterBottom>درصد فعلی: {commission}%</Typography>
            <Slider
                value={commission}
                onChange={(e, val) => setCommission(val as number)}
                step={0.5}
                min={0}
                max={10}
                valueLabelDisplay="auto"
            />
            <Button variant="contained" onClick={handleSave}>ذخیره تغییرات</Button>
        </Box>
    );
};

export default CommissionControl;
