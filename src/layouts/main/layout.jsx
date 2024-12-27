'use client';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

import { Main, CompactContent } from './main';
import { LayoutSection } from '../core/layout-section';
import { HeaderSection } from '../core/header-section';
import { usePathname } from 'src/routes/hooks/use-pathname';
import { useEffect, useState } from 'react';
import { Button, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { _notifications } from 'src/_mock';
import { RouterLink } from 'src/routes/components';
import Link from '@mui/material/Link';
import { paths } from 'src/routes/paths';
import { useAuthContext } from 'src/auth/hooks';
import NavbarDekstop from 'src/components/organims/navbar-dekstop/NavbarDekstop';
import NavMobile from 'src/components/organims/navbar-mobile/NavbarMobile';
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

export function MainLayout({ sx, children, header, content }) {
  const [showLayout, setShowLayout] = useState(true);
  const layoutQuery = 'md';
  const pathName = usePathname();
  const pathNameHiddenLayout = ['/auth', '/dashboard'];
  const { user } = useAuthContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleShowLayout = () => {
    const shouldShowLayout = pathNameHiddenLayout.some((path) => pathName.startsWith(path));

    setShowLayout(!shouldShowLayout);
  };

  useEffect(() => {
    handleShowLayout();
  }, [pathName]);

  const hideHeaderSection = pathName.startsWith('/client') && isMobile;

  return (
    <LayoutSection
      /** **************************************
       * Header
       *************************************** */
      headerSection={
        showLayout && !hideHeaderSection ? (
          <HeaderSection
            layoutQuery={layoutQuery}
            slotProps={{ container: { maxWidth: false } }}
            // sx={header?.sx}
            slots={{
              topArea: (
                <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
                  This is an info Alert.
                </Alert>
              ),
              leftArea: (
                <Link
                  component={RouterLink}
                  href={paths.home}
                  sx={{
                    color: theme.palette.text.primary,
                    '&:hover': { textDecoration: 'none' },
                    textDecoration: 'none',
                  }}
                >
                  <Stack direction={'row'} columnGap={{ md: 3, xs: 2 }} alignItems={'center'}>
                    <Box
                      sx={{
                        width: '45px',
                        height: '45px',
                        borderRadius: '50%',
                        backgroundColor: '#d9d9d9',
                      }}
                    ></Box>
                    <Typography variant="h3">Dentaloka</Typography>
                  </Stack>
                </Link>
              ),
              rightArea: (
                <Box
                  display="flex"
                  alignItems="center"
                  gap={{ xs: 1, sm: 1.5 }}
                  width={'100%'}
                  justifyContent={'end'}
                >
                  <NavbarDekstop user={user} />
                  <NavMobile />
                </Box>
              ),
            }}
          />
        ) : null
      }
      /** **************************************
       * Footer
       *************************************** */
      footerSection={null}
      /** **************************************
       * Style
       *************************************** */
      cssVars={{
        '--layout-simple-content-compact-width': '448px',
      }}
      sx={sx}
    >
      <Main sx={{ py: 3 }}>
        {content?.compact ? (
          <CompactContent layoutQuery={layoutQuery}>{children}</CompactContent>
        ) : (
          <>{children}</>
        )}
      </Main>
    </LayoutSection>
  );
}
