'use client'

import Image from 'next/image';

import { Box } from '@mui/material';

const banners = [
  '/images/banners/banner-1.png',
  '/images/banners/banner-2.png',
  '/images/banners/banner-3.png',
  '/images/banners/banner-4.png',
]

const BannersSection = () => {
  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: 'auto',
        my: { xs: 4, sm: 6, md: 8 },
        px: { xs: 2, sm: 3 },
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 2, sm: 3 },
      }}
    >
      {banners.map((src, i) => (
        <Box
          key={i}
          sx={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 6',
            borderRadius: 3,
            overflow: 'hidden',
          }}
        >
          <Image
            src={src}
            alt={`banner-${i + 1}`}
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        </Box>
      ))}
    </Box>
  )
}

export default BannersSection
