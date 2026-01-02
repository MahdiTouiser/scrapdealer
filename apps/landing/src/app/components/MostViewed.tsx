'use client'

import Image from 'next/image';

import {
  Box,
  Divider,
  Typography,
} from '@mui/material';

const ItemRow = ({ title, price, up }: { title: string; price: string; up: boolean }) => (
    <Box
        sx={{
            flex: 1,
            minWidth: 0,
            backgroundColor: up ? 'rgba(6,151,92,0.1)' : 'rgba(151,6,8,0.1)',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            height: 48,
        }}
    >
        <Typography sx={{ fontSize: 13, fontWeight: 500 }} noWrap>
            {title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ fontSize: 13, fontWeight: 500 }}>{price}</Typography>
            <Image src={up ? '/icons/chevUp.svg' : '/icons/chevDown.svg'} alt="" width={16} height={16} />
        </Box>
    </Box>
)

const MostViewed = () => {
    return (
        <Box sx={{ width: '100%', maxWidth: 640 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography sx={{ fontWeight: 700, fontSize: 20 }}>پربازدید های امروز</Typography>
                <Image src="/icons/graph.png" alt="" width={20} height={20} />
            </Box>

            <Box
                sx={{
                    border: '1px solid #EFEFEF',
                    borderRadius: 3,
                    p: 3,
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography sx={{ fontWeight: 700 }}>ضایعات استیل</Typography>
                    <Typography sx={{ fontSize: 13, color: '#606060' }}>همه</Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: 2,
                    }}
                >
                    <ItemRow title="استیل 304" price="15,800" up />
                    <ItemRow title="استیل 201" price="19,100" up={false} />
                </Box>

                <Divider sx={{ my: 3 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography sx={{ fontWeight: 700 }}>ضایعات مس و آلومینیوم</Typography>
                    <Typography sx={{ fontSize: 13, color: '#606060' }}>همه</Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: 2,
                    }}
                >
                    <ItemRow title="مس درجه یک" price="22,500" up />
                    <ItemRow title="مس درجه دو" price="18,700" up={false} />
                </Box>
            </Box>
        </Box>
    )
}

export default MostViewed
