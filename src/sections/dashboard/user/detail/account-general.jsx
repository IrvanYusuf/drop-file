import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { Avatar } from '@mui/material';

// ----------------------------------------------------------------------

export function AccountGeneral({ currentUser }) {
  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={4}>
        <Card
          sx={{
            pt: 10,
            pb: 5,
            px: 3,
            textAlign: 'center',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Avatar sx={{ width: 120, height: 120, textAlign: 'center' }} />
          </Box>
        </Card>
      </Grid>

      <Grid xs={12} md={8}>
        <Card sx={{ p: 3 }}>
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
          >
            <Box>
              <Box sx={{ typography: 'subtitle2', color: 'text.secondary' }}>Full Name</Box>
              <Typography sx={{ typography: 'subtitle1', mt: 1 }}>
                {currentUser && currentUser.fullname}
              </Typography>
            </Box>
            <Box>
              <Box sx={{ typography: 'subtitle2', color: 'text.secondary' }}>Email</Box>
              <Typography sx={{ typography: 'subtitle1', mt: 1 }}>
                {currentUser && currentUser.email}
              </Typography>
            </Box>
            <Box>
              <Box sx={{ typography: 'subtitle2', color: 'text.secondary' }}>Phone Number</Box>
              <Typography sx={{ typography: 'subtitle1', mt: 1 }}>
                {currentUser && currentUser.phone}
              </Typography>
            </Box>
            <Box>
              <Box sx={{ typography: 'subtitle2', color: 'text.secondary' }}>Address</Box>
              <Typography sx={{ typography: 'subtitle1', mt: 1 }}>
                {currentUser && currentUser.address ? currentUser.address : '-'}
              </Typography>
            </Box>

            <Box>
              <Box sx={{ typography: 'subtitle2', color: 'text.secondary' }}>Country</Box>
              <Typography sx={{ typography: 'subtitle1', mt: 1 }}>
                {currentUser && currentUser.country ? currentUser.country : '-'}
              </Typography>
            </Box>
            <Box>
              <Box sx={{ typography: 'subtitle2', color: 'text.secondary' }}>State/region</Box>
              <Typography sx={{ typography: 'subtitle1', mt: 1 }}>
                {currentUser && currentUser.state ? currentUser.state : '-'}
              </Typography>
            </Box>
            <Box>
              <Box sx={{ typography: 'subtitle2', color: 'text.secondary' }}>City</Box>
              <Typography sx={{ typography: 'subtitle1', mt: 1 }}>
                {currentUser && currentUser.city ? currentUser.city : '-'}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Box>
              <Box sx={{ typography: 'subtitle2', color: 'text.secondary' }}>About</Box>
              <Typography sx={{ typography: 'subtitle1', mt: 1 }}>
                {currentUser && currentUser.description ? currentUser.description : '-'}
              </Typography>
            </Box>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}
