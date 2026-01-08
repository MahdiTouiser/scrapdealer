'use client'

import 'swiper/css';
import 'swiper/css/pagination';

import Image from 'next/image';
import {
  Autoplay,
  Pagination,
} from 'swiper/modules';
import {
  Swiper,
  SwiperSlide,
} from 'swiper/react';

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
      }}
    >
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        style={{ borderRadius: 24 }}
      >
        {banners.map((src, i) => (
          <SwiperSlide key={i}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                aspectRatio: { xs: '16 / 9', md: '16 / 6' },
                backgroundColor: '#ffffffff',
                borderRadius: 3,
                overflow: 'hidden',
              }}
            >
              <Image
                src={src}
                alt={`banner-${i + 1}`}
                fill
                sizes="(max-width: 600px) 100vw, 1200px"
                style={{ objectFit: 'contain' }}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}

export default BannersSection
