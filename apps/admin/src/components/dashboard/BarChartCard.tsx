import React from 'react';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import {
  Paper,
  Typography,
} from '@mui/material';

interface BarChartCardProps {
    title: string;
    data: unknown[];
    dataKey: string;
    color?: string;
    xDataKey: string;
}

const BarChartCard: React.FC<BarChartCardProps> = ({ title, data, dataKey, color = '#8884d8', xDataKey }) => {
    return (
        <Paper
            sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                bgcolor: 'background.paper',
                direction: 'rtl', // Persian support
            }}
        >
            <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: 600, mb: 2, fontFamily: 'Vazirmatn, sans-serif' }}
            >
                {title}
            </Typography>
            <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="4 4" stroke="#f0f0f0" />
                    <XAxis dataKey={xDataKey} tick={{ fontSize: 13, fontFamily: 'Vazirmatn, sans-serif' }} />
                    <YAxis tick={{ fontSize: 13, fontFamily: 'Vazirmatn, sans-serif' }} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#fff',
                            borderRadius: 12,
                            boxShadow: '0 3px 10px rgba(0,0,0,0.12)',
                            fontFamily: 'Vazirmatn, sans-serif',
                        }}
                    />
                    <Legend
                        wrapperStyle={{
                            paddingTop: 12,
                            textAlign: 'right',
                            fontFamily: 'Vazirmatn, sans-serif',
                        }}
                        layout="horizontal"
                        verticalAlign="bottom"
                    />
                    <Bar dataKey={dataKey} fill={color} radius={[6, 6, 0, 0]} barSize={24} />
                </BarChart>
            </ResponsiveContainer>
        </Paper>
    );
};

export default BarChartCard;
