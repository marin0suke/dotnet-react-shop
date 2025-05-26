import React from 'react';
import { Box, Button, Container, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import productImg from '../assets/good-vita-d-image.png';


const HeroSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0, 6, 0),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: 500,
}));

const ProductCard = styled(Paper)(({ theme }) => ({
  borderRadius: 24,
  boxShadow: '0 4px 24px 0 rgba(0,0,0,0.06)',
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: 340,
}));

const HomePage = () => (
  <Box sx={{ minHeight: '100vh' }}>
    <HeroSection>
      <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 }}>
        <Box sx={{ flex: 1, minWidth: 300 }}>
          <Typography variant="h2" sx={{ fontWeight: 700, color: '#222', mb: 2, fontSize: { xs: 36, md: 54 } }}>
            Discover the Good Fibre Difference
          </Typography>
          <Typography variant="body1" sx={{ color: '#444', mb: 4, fontWeight: 400, fontSize: { xs: 20, md: 24 } }}>
            The Good Vitamin Co brings you delicious, no-added-sugar fibre soft-chews for everyday wellness. Perfect for your customers who want healthy, natural, and vegan-friendly supplements.
          </Typography>
          <Button variant="contained" color="primary" size="large" sx={{ borderRadius: 8, fontWeight: 700, fontSize: 18, boxShadow: '0 2px 8px 0 rgba(0,0,0,0.08)' }}>
            Sign Up as a Retailer
          </Button>
        </Box>
        <ProductCard elevation={0}>
          <img src={productImg} alt="Good Fibre Bottle" style={{ width: 220, height: 'auto', borderRadius: 16, background: '#f4f6fa', padding: 8 }} />
        </ProductCard>
      </Container>
    </HeroSection>
    {/* Add more marketing sections here if needed */}
  </Box>
);

export default HomePage; 