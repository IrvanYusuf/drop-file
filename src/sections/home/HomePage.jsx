import { Box, Container } from '@mui/material';
import { HeroSection } from 'src/components/sections/homePage/HeroSection';
import { AdvertisementSection } from './AdvertisementSection';

export default function HomePage() {
  return (
    <Container>
      <HeroSection />
      <Box sx={{ mt: 10 }}>
        <AdvertisementSection />
      </Box>
    </Container>
  );
}
