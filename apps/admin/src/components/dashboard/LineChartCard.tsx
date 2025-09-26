import React from 'react';

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import {
  Paper,
  Typography,
} from '@mui/material';

interface LineChartCardProps {
    title: string;
    data: unknown[];
    dataKeys: { key: string; color: string; name?: string }[];
    xDataKey: string;
}

const LineChartCard: React.FC<LineChartCardProps> = ({ title, data, dataKeys, xDataKey }) => {
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
                <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="4 4" stroke="#f0f0f0" />
                    <XAxis
                        dataKey={xDataKey}
                        tick={{ fontSize: 13, fontFamily: 'Vazirmatn, sans-serif' }}
                    />
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
                    {dataKeys.map((item) => (
                        <Line
                            key={item.key}
                            type="monotone"
                            dataKey={item.key}
                            stroke={item.color}
                            strokeWidth={3}
                            name={item.name || item.key}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </Paper>
    );
};

export default LineChartCard;
