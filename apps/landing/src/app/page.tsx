'use client'
import './globals.css';

import { Box } from '@mui/material';

import AboutSection from './components/AboutSection';
import Banner from './components/Banner';
import ContactSection from './components/ContactSection';
import FeaturesSection from './components/FeaturesSection';
import Footer from './components/Footer';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import Navbar from './components/Navbar';
import NewsSection from './components/NewsSection';
import PricesSection from './components/PricesSection';
import ThemeProvider from './components/ThemeProvider';
import VideoSection from './components/VideoSection';

export default function Page() {
  return (
    <ThemeProvider>
      <Box>
        <Header />
        <Navbar />
        <Banner />
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