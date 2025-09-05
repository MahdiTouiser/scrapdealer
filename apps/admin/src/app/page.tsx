'use client';

import {
  Button,
  Container,
  Typography,
} from '@mui/material';

export default function Page() {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>ScrapDealer Admin</Typography>
      <Button variant="contained">Primary Action</Button>
    </Container>
  );
}
