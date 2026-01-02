'use client'
import './globals.css';

import { Box } from '@mui/material';

import Banner from './components/Banner';
import CurrentPrice from './components/CurrentPrice';
import Header from './components/Header';
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
        <Box>
          <CurrentPrice />
        </Box>
        <NeedHelp />
        <ScrapSegregation />
      </Box>
    </ThemeProvider>
  );
}