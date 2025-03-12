'use client';

import { Box, Divider, Stack } from '@mui/material';
import { AnimateCountUp, MotionViewport, varFade } from 'src/components/animate';
import { textGradient, varAlpha } from 'src/theme/styles';
import { m } from 'framer-motion';
import VerticalDivider from 'src/components/VerticalDivider';
import HorizontalDivider from 'src/components/HorizontalDivider';

const TrustedByNumber = () => {
  return (
    // <MotionViewport>
    <Stack sx={{ py: { xs: 5, md: 8 }, position: 'relative', mt: 10 }}>
      {<HorizontalDivider position={'top'} />}

      <Stack spacing={5} direction={{ xs: 'column', md: 'row' }} divider={<VerticalDivider />}>
        {[
          { label: 'Purchased order', value: 12.121 },
          { label: 'Happy customers', value: 160 },
          { label: 'Review rate', value: 4.9 },
        ].map((item) => (
          <Stack key={item.label} spacing={2} sx={{ textAlign: 'center', width: 1 }}>
            <m.div variants={varFade({ distance: 24 }).inUp}>
              <AnimateCountUp
                to={item.value}
                unit={item.label === 'Purchased order' ? 'k+' : '+'}
                toFixed={item.label === 'Happy customers' ? 0 : 1}
                sx={{
                  fontWeight: 'fontWeightBold',
                  fontSize: { xs: 40, md: 64 },
                  lineHeight: { xs: 50 / 40, md: 80 / 64 },
                  fontFamily: (theme) => theme.typography.fontSecondaryFamily,
                }}
              />
            </m.div>

            <m.div variants={varFade({ distance: 24 }).inUp}>
              <Box
                component="span"
                sx={(theme) => ({
                  ...textGradient(
                    `90deg, ${theme.vars.palette.text.primary}, ${varAlpha(
                      theme.vars.palette.text.primaryChannel,
                      0.2
                    )}`
                  ),
                  opacity: 0.4,
                  typography: 'h6',
                })}
              >
                {item.label}
              </Box>
            </m.div>
          </Stack>
        ))}
      </Stack>

      {<HorizontalDivider position={'bottom'} />}
    </Stack>
    // </MotionViewport>
  );
};

export default TrustedByNumber;
