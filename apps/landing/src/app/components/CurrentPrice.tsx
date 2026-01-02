'use client'

import {
  Box,
  Typography,
} from '@mui/material';

const CurrentPrice = () => {
    return (
        <Box
            sx={{
                width: 632,
                height: 312,
                backgroundColor: '#FFFFFF',
                border: '1px solid #EFEFEF',
                boxShadow: '0px 2px 12px rgba(142, 142, 172, 0.12)',
                borderRadius: '18px',
                boxSizing: 'border-box',
                p: 3
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography
                    sx={{

                        fontWeight: 700,
                        fontSize: 18,
                        color: '#000'
                    }}
                >
                    ضایعات آهن
                </Typography>
                <Typography
                    sx={{
                        fontWeight: 500,
                        fontSize: 13,
                        color: '#606060'
                    }}
                >
                    همه
                </Typography>
            </Box>



            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Box
                    sx={{
                        width: 280,
                        height: 41,
                        backgroundColor: 'rgba(151,6,8,0.1)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        px: 2
                    }}
                >
                    <Typography sx={{ fontWeight: 500, fontSize: 13 }}>
                        پروفیل ضایعاتی
                    </Typography>
                    <Typography sx={{ fontWeight: 500, fontSize: 13 }}>
                        19,100
                    </Typography>
                </Box>

                <Box
                    sx={{
                        width: 280,
                        height: 41,
                        backgroundColor: 'rgba(6,151,92,0.1)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        px: 2
                    }}
                >
                    <Typography sx={{ fontWeight: 500, fontSize: 13 }}>
                        آهن سنگین
                    </Typography>
                    <Typography sx={{ fontWeight: 500, fontSize: 13 }}>
                        15,800
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default CurrentPrice
