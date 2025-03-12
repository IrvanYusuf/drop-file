'use client';

import { Avatar, Card, Container, Divider, Grid, Stack, Typography, useTheme } from '@mui/material';
import { NavSectionVertical } from 'src/components/nav-section';
import { navDataClientProfile } from '../config-nav-client-profile';
import { CONFIG } from 'src/config-global';
const LayoutDesktop = ({ layoutQuery, user, children }) => {
  const theme = useTheme();
  const navDataClientProfileFilter = user
    ? navDataClientProfile.map((nav) => ({
        ...nav,
        items: Array.isArray(nav.items)
          ? nav.items.filter((item) => item && item.visibility?.includes(user?.role))
          : [],
      }))
    : navDataClientProfile.map((nav) => ({
        ...nav,
        items: nav.items.filter((item) => item && !item.needLogin),
      }));

  console.log('nav filter', navDataClientProfileFilter);

  return (
    <Container
      sx={{
        [theme.breakpoints.down(layoutQuery)]: {
          display: 'none',
        },
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Card sx={{ padding: 2 }}>
            <Stack direction={'row'} alignItems={'center'} spacing={2}>
              <Avatar src={user && `${CONFIG.BASE_API_URL}/images/avatar/${user.photo}`}></Avatar>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {user?.fullname}
              </Typography>
            </Stack>
            <Divider sx={{ marginY: 2 }} />
            <NavSectionVertical data={navDataClientProfileFilter && navDataClientProfileFilter} />
          </Card>
        </Grid>
        <Grid item xs={9}>
          <Card sx={{ padding: 2, height: '100%' }}>{children}</Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LayoutDesktop;
