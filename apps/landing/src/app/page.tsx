'use client'
import './globals.css';

import { Box } from '@mui/material';

import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import FeaturesSection from './components/FeaturesSection';
import Footer from './components/Footer';
import HeroBanner from './components/HeroBanner';
import NewsSection from './components/NewsSection';
import PricesSection from './components/PricesSection';
import ThemeProvider from './components/ThemeProvider';
import VideoSection from './components/VideoSection';

export default function Page() {
  return (
    <ThemeProvider>
      <Box>
        <HeroBanner />
        <PricesSection />
        <FeaturesSection />
        <AboutSection />
        <VideoSection />
        <NewsSection />
        <ContactSection />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}