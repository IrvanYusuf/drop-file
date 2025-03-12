'use client';

import { m } from 'framer-motion';
import { Avatar, Box, Rating, Stack, Typography } from '@mui/material';
import { _mock } from 'src/_mock';
import { varFade } from 'src/components/animate';
import {
  Carousel,
  CarouselArrowBasicButtons,
  carouselBreakpoints,
  CarouselDotButtons,
  useCarousel,
} from 'src/components/carousel';
import HorizontalDivider from 'src/components/HorizontalDivider';
import { fToNow } from 'src/utils/format-time';
import { maxLine } from 'src/theme/styles';
import { SectionTitle } from 'src/components/section-title/SectionTitle';

const Testimonials = () => {
  const carousel = useCarousel({
    align: 'start',
    slidesToShow: { xs: 1, sm: 2, md: 3, lg: 4 },
    breakpoints: {
      [carouselBreakpoints.sm]: { slideSpacing: '24px' },
      [carouselBreakpoints.md]: { slideSpacing: '40px' },
      [carouselBreakpoints.lg]: { slideSpacing: '64px' },
    },
  });
  return (
    <Box sx={{ mt: 10 }}>
      <Stack sx={{ position: 'relative', py: { xs: 5, md: 8 } }}>
        <SectionTitle
          caption={null}
          title="What they"
          txtGradient="says"
          description={'Hear from Our Happy Customers'}
          sx={{ mb: 8, textAlign: 'center' }}
        />
        <HorizontalDivider position={'top'} />

        <Carousel carousel={carousel}>
          {TESTIMONIALS.map((item) => (
            <Stack key={item.id} component={m.div} variants={varFade().in}>
              <Stack spacing={1} sx={{ typography: 'subtitle2' }}>
                <Rating
                  size="small"
                  name="read-only"
                  value={item.rating}
                  precision={0.5}
                  readOnly
                />
                {item.category}
              </Stack>

              <Typography
                sx={(theme) => ({
                  ...maxLine({ line: 4, persistent: theme.typography.body1 }),
                  mt: 2,
                  mb: 3,
                })}
              >
                {item.content}
              </Typography>

              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar alt={item.name} src={item.avatar} sx={{ width: 48, height: 48 }} />
                <Stack sx={{ typography: 'subtitle1' }}>
                  <Box component="span">{item.name}</Box>
                  <Box component="span" sx={{ typography: 'body2', color: 'text.disabled' }}>
                    {fToNow(new Date(item.postedAt))}
                  </Box>
                </Stack>
              </Stack>
            </Stack>
          ))}
        </Carousel>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mt: { xs: 5, md: 8 } }}
        >
          <CarouselDotButtons
            variant="rounded"
            scrollSnaps={carousel.dots.scrollSnaps}
            selectedIndex={carousel.dots.selectedIndex}
            onClickDot={carousel.dots.onClickDot}
          />

          <CarouselArrowBasicButtons {...carousel.arrows} options={carousel.options} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default Testimonials;

const base = (index) => ({
  id: _mock.id(index),
  name: _mock.fullName(index),
  avatar: _mock.image.avatar(index),
  rating: 5,
});

const TESTIMONIALS = [
  {
    ...base(1),
    category: 'Design Quality',
    content: `The quality of this template is very good, the TypeScript files are neat and the communication with the team behind this template is very good! I would recommend this template for any kind of project, as they implement new features every now and then and enhance their design. I will definitely be using more templates from this team and re-purchasing this template for other projects.`,
    postedAt: 'April 20, 2024 23:15:30',
  },
  {
    ...base(2),
    category: 'Design Quality',
    content: `Amazing. I've never purchased complete front ends before, but I'll definitely be doing this again!`,
    postedAt: 'March 19, 2024 23:15:30',
  },
  {
    ...base(3),
    category: 'Code Quality',
    content: `Clean & Complete (Design & Code). Thansk Minimal team :)`,
    postedAt: 'April 19, 2023 23:15:30',
  },
  {
    ...base(4),
    category: 'Customer Support',
    content: `Thanks to Minimal for customer support with email. I solved the problem. And the code quality is good, too.`,
    postedAt: 'May 19, 2023 23:15:30',
  },
  {
    ...base(5),
    category: 'Customer Support',
    content:
      'Great UI kit, really beautiful as well. Also the customer support is very warm-hearted. However, I hope the components and themes can be provided as a separated project (package).',
    postedAt: 'June 19, 2023 23:15:30',
  },
  {
    ...base(6),
    category: 'Design Quality',
    content: 'I would never have been able to create all these beautifull components myself!',
    postedAt: 'July 19, 2023 23:15:30',
  },
  {
    ...base(7),
    category: 'Code Quality',
    content:
      'The quality of this template is excellent. However, as an individual, the cost of obtaining the TypeScript Source version is beyond my means. Despite my strong desire to acquire it, my limited personal budget does not allow me to do so.',
    postedAt: 'August 19, 2023 23:15:30',
  },
  {
    ...base(8),
    category: 'Customizability',
    content:
      'The design and code quality are impressive. Regular updates and excellent customer support are major advantages.',
    postedAt: 'September 19, 2023 23:15:30',
  },
];
