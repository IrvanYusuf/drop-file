'use client';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { Alert, Avatar, Badge, Button, CircularProgress, Link, useTheme } from '@mui/material';
import { AnimateAvatar } from 'src/components/animate';
import { useMockedUser } from 'src/auth/hooks';
import { varAlpha } from 'src/theme/styles';
import { Iconify } from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';
import { CONFIG } from 'src/config-global';
import { paths } from 'src/routes/paths';
import { useMutation } from 'src/hooks/fetch-custom/use-mutation';
import { endpoints } from 'src/routes/endpoints';
import { useState } from 'react';

// ----------------------------------------------------------------------

export function AccountGeneral({
  currentUser,
  isEditButtonShow = false,
  buttonVerifyAccountShow = false,
}) {
  const { user } = useMockedUser();
  const theme = useTheme();
  const [sendVerifyEmail, setSendVerifyEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isVerified = currentUser && currentUser?.is_verified ? true : false;

  // ${CONFIG.BASE_API_URL}${file.file_path}
  console.log(currentUser);

  const { mutate: requestVerify } = useMutation('POST', endpoints.auth.requestVerifyEmail, {
    onSuccess: () => {
      setSendVerifyEmail(true);
      setIsLoading(false);
    },
  });

  const handleRequestVerify = () => {
    setIsLoading(true);
    requestVerify({ email: currentUser?.email });
  };

  return (
    <>
      {sendVerifyEmail && (
        <Alert severity="info" sx={{ mb: 3 }} onClose={() => setSendVerifyEmail(false)}>
          Check your email for link verification
        </Alert>
      )}
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
            {/* <Badge badgeContent={4} color="primary"> */}

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box sx={{ position: 'relative', width: 120 }}>
                <AnimateAvatar
                  width={120}
                  slotProps={{
                    avatar: {
                      src: `${CONFIG.BASE_API_URL}/images/avatar/${currentUser && currentUser.photo}`,
                      alt: currentUser?.fullname,
                    },
                    overlay: {
                      border: 2,
                      spacing: 3,
                      color: isVerified
                        ? `linear-gradient(135deg, ${varAlpha(theme.vars.palette.info.mainChannel, 0)} 2%, ${theme.vars.palette.info.darker} 100%)`
                        : `linear-gradient(135deg, ${varAlpha(theme.vars.palette.primary.mainChannel, 0)} 2%, ${theme.vars.palette.primary.main} 100%)`,
                    },
                  }}
                >
                  {user?.displayName?.charAt(0).toUpperCase()}
                </AnimateAvatar>
                {isVerified && (
                  <Box sx={{ position: 'absolute', top: 0, right: 0, zIndex: 999 }}>
                    <Iconify
                      icon="solar:verified-check-bold"
                      width={30}
                      style={{ color: theme.vars.palette.primary.main }}
                    />
                  </Box>
                )}
              </Box>
            </Box>
            {buttonVerifyAccountShow && !isVerified && (
              <Button
                disabled={isLoading}
                startIcon={isLoading ? <CircularProgress size={20} /> : null}
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={handleRequestVerify}
              >
                {isLoading ? 'Loading...' : 'verify your account'}
              </Button>
            )}

            {/* </Badge> */}
          </Card>
        </Grid>

        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            {isEditButtonShow && (
              <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                <Link component={RouterLink} href={paths.client.profile.edit(currentUser?.user_id)}>
                  <Button
                    variant="outlined"
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Box component={'span'} sx={{ mr: '4px', display: 'flex' }}>
                      <Iconify icon="solar:pen-bold" />
                    </Box>
                    Edit Profile
                  </Button>
                </Link>
              </Box>
            )}
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
                  {currentUser && currentUser.phone ? currentUser.phone : '-'}
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
    </>
  );
}
