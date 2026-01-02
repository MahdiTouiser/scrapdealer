'use client'
import './globals.css';

import { Box } from '@mui/material';

import Banner from './components/Banner';
import CurrentPrice from './components/CurrentPrice';
import Header from './components/Header';
import MostViewed from './components/MostViewed';
import Navbar from './components/Navbar';
import NeedHelp from './components/NeedHelp';
import ScrapSegregation from './components/ScrapSegregation';
import ThemeProvider from './components/ThemeProvider';

export default function Page() {
  return (
    <ThemeProvider >
      <Box>
        <Header />
        <Navbar />
        <Banner />
        <Box display='flex' justifyContent='center'>
          <CurrentPrice />
          <MostViewed />
        </Box>
        <NeedHelp />
        <ScrapSegregation />
      </Box>
    </ThemeProvider>
  );
}