'use client'
import './globals.css';

import { colors } from '@/colors';
import { Box } from '@mui/material';

import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import FeaturesSection from './components/FeaturesSection';
import Footer from './components/Footer';
import HeroBanner from './components/HeroBanner';
import Navbar from './components/Navbar';
import NewsSection from './components/NewsSection';
import PricesSection from './components/PricesSection';
import VideoSection from './components/VideoSection';

export default function Page() {
  return (
    <Box sx={{ direction: 'rtl', bgcolor: colors.light.background }}>
      <Navbar />
      <HeroBanner />
      <FeaturesSection />
      <AboutSection />
      <PricesSection />
      <VideoSection />
      <NewsSection />
      <ContactSection />
      <Footer />
    </Box>
  );
}