'use client'

import Image from 'next/image';

import {
  Box,
  Divider,
  Typography,
} from '@mui/material';

const CurrentPrice = () => {
    return (
        <Box sx={{ position: 'relative', width: 632, m: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, m: 1, justifyContent: 'flex-start' }}>
                <Typography sx={{ fontWeight: 700, fontSize: 20, color: '#000' }}>
                    قیمت لحظه ای
                </Typography>
                <Image src="/icons/chart.svg" alt="chart" width={20} height={20} />
            </Box>

            <Box sx={{ width: '100%', backgroundColor: '#FFFFFF', border: '1px solid #EFEFEF', boxShadow: '0px 2px 12px rgba(142,142,172,0.12)', borderRadius: '18px', boxSizing: 'border-box', p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: 18, color: '#000' }}>
                        ضایعات آهن
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Typography sx={{ fontWeight: 500, fontSize: 13, color: '#606060' }}>همه</Typography>
                        <Image src="/icons/arrow-left-single.svg" alt="arrow" width={12} height={12} />
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, mt: 2, height: 50 }}>
                    <Box sx={{ flex: 1, backgroundColor: 'rgba(6,151,92,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2 }}>
                        <Typography sx={{ fontWeight: 500, fontSize: 13 }}>آهن سنگین</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography sx={{ fontWeight: 500, fontSize: 13 }}>15,800</Typography>
                            <Image src="/icons/chevUp.svg" alt="up" width={16} height={16} />
                        </Box>
                    </Box>


                    <Box sx={{ flex: 1, backgroundColor: 'rgba(151,6,8,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2 }}>
                        <Typography sx={{ fontWeight: 500, fontSize: 13 }}>پروفیل ضایعاتی</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography sx={{ fontWeight: 500, fontSize: 13 }}>19,100</Typography>
                            <Image src="/icons/chevDown.svg" alt="down" width={16} height={16} />
                        </Box>
                    </Box>
                </Box>

                <Divider sx={{ my: 4, borderColor: '#EFEFEF' }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4, mb: 2 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: 18, color: '#000' }}>
                        ضایعات مس و آلومینیوم
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Typography sx={{ fontWeight: 500, fontSize: 13, color: '#606060' }}>همه</Typography>
                        <Image src="/icons/arrow-left-single.svg" alt="arrow" width={12} height={12} />
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, mt: 2, height: 50 }}>
                    <Box sx={{ flex: 1, backgroundColor: 'rgba(6,151,92,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2 }}>
                        <Typography sx={{ fontWeight: 500, fontSize: 13 }}>مس درجه یک</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography sx={{ fontWeight: 500, fontSize: 13 }}>22,500</Typography>
                            <Image src="/icons/chevUp.svg" alt="up" width={16} height={16} />
                        </Box>
                    </Box>


                    <Box sx={{ flex: 1, backgroundColor: 'rgba(151,6,8,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2 }}>
                        <Typography sx={{ fontWeight: 500, fontSize: 13 }}>مس درجه دو</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography sx={{ fontWeight: 500, fontSize: 13 }}>18,700</Typography>
                            <Image src="/icons/chevDown.svg" alt="down" width={16} height={16} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default CurrentPrice;
