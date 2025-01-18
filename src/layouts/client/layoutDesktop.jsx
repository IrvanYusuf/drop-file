'use client';

import { Avatar, Card, Container, Divider, Grid, Stack, Typography, useTheme } from '@mui/material';
import { NavSectionVertical } from 'src/components/nav-section';
import { navDataClientProfile } from '../config-nav-client-profile';
const LayoutDesktop = ({ layoutQuery, user, children }) => {
  const theme = useTheme();
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
              <Avatar src={user?.photoURL}></Avatar>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Irvan
              </Typography>
            </Stack>
            <Divider sx={{ marginY: 2 }} />
            <NavSectionVertical data={navDataClientProfile} />
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
