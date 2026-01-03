'use client'
import './globals.css';

import { Box } from '@mui/material';

import AboutSection from './components/AboutSection';
import Banner from './components/Banner';
import BannersSection from './components/BannersSection';
import CurrentPrice from './components/CurrentPrice';
import FeaturesSection from './components/FeaturesSection';
import Header from './components/Header';
import MostViewed from './components/MostViewed';
import Navbar from './components/Navbar';
import NeedHelp from './components/NeedHelp';
import ScrapSegregation from './components/ScrapSegregation';
import ScrapsGrid from './components/ScrapsGrid';
import ThemeProvider from './components/ThemeProvider';

export default function Page() {
  return (
    <ThemeProvider>
      <Box>
        <Header />
        <Navbar />
        <Banner />
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            justifyContent: 'center',
            alignItems: 'stretch',
            gap: 3,
            px: { xs: 2, lg: 0 },
            mt: 4
          }}
        >
          <CurrentPrice />
          <MostViewed />
        </Box>

        <NeedHelp />
        <ScrapsGrid />
        <ScrapSegregation />
        <AboutSection />
        <FeaturesSection />
        <BannersSection />
      </Box>
    </ThemeProvider>
  );
}