import React from 'react';

import {
  Cell,
  Pie,
  PieChart,
  PieLabelRenderProps,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import {
  Paper,
  Typography,
} from '@mui/material';

interface PieData {
    name: string;
    value: number;
}

interface PieChartCardProps {
    title: string;
    data: PieData[];
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
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={110}
                        innerRadius={40}
                        paddingAngle={4}
                        label={(props: PieLabelRenderProps & { percent?: number; name?: string }) => {
                            const name = props.name ?? '';
                            const percent = props.percent ?? 0;
                            return `${name} (${(percent * 100).toFixed(0)}%)`;
                        }}
                        labelLine={{ stroke: '#ccc' }}
                    >
                        {data.map((_, index) => (
                            <Cell key={index} fill={colors[index % colors.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#fff',
                            borderRadius: 12,
                            boxShadow: '0 3px 10px rgba(0,0,0,0.12)',
                            fontFamily: 'Vazirmatn, sans-serif',
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </Paper>
    );
};

export default PieChartCard;
