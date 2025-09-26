import React from 'react';

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import {
  Paper,
  Typography,
} from '@mui/material';

interface PieChartCardProps {
    title: string;
    data: { name: string; value: number }[];
    colors?: string[];
}
const PieChartCard: React.FC<PieChartCardProps> = ({
    title,
    data,
    colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
}) => {
    return (
        <Paper
            sx={{
                padding: 2,
                borderRadius: 2,
                boxShadow: 3,
                bgcolor: 'background.paper',
            }}
        >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
                {title}
            </Typography>
            <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label={({ name, percent }) => `${name} (${(percent as number * 100).toFixed(0)}%)`}
                        labelLine={{ stroke: '#999' }}
                    >
                        {data.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#fff',
                            borderRadius: '8px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </Paper>
    );
};

export default PieChartCard;
