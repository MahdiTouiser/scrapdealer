'use client'
import './globals.css';

import { Box } from '@mui/material';

import AboutSection from './components/AboutSection';
import Banner from './components/Banner';
import ContactSection from './components/ContactSection';
import CurrentPrice from './components/CurrentPrice';
import FeaturesSection from './components/FeaturesSection';
import Footer from './components/Footer';
import Header from './components/Header';
import Navbar from './components/Navbar';
import NeedHelp from './components/NeedHelp';
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
        <Box>
          <CurrentPrice />
        </Box>
        <NeedHelp />
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