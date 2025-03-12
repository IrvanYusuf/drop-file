import { Box, Container } from '@mui/material';
import { HeroSection } from 'src/components/sections/homePage/HeroSection';
import { AdvertisementSection } from './AdvertisementSection';
import HowItWorks from './HowItWorks';
import TrustedByNumber from './TrustedByNumber';
import Testimonials from './Testimonials';
import { FaqSection } from './FaqSection';

export default function HomePage() {
  return (
    <Container>
      <HeroSection />
      <TrustedByNumber />
      <HowItWorks />
      <Testimonials />
      <FaqSection />
      <Box sx={{ mt: 10 }}>
        <AdvertisementSection />
      </Box>
    </Container>
  );
}
