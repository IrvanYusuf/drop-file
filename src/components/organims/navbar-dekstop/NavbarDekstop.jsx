import { Box, Button, Fade, Menu, MenuItem, Stack, Typography, useTheme } from '@mui/material';
import Link from '@mui/material/Link';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useState } from 'react';
import { _notifications } from 'src/_mock';
import { Iconify } from 'src/components/iconify';
import { NotificationsDrawer } from 'src/layouts/components/notifications-drawer';
import { _accountUser } from 'src/layouts/config-nav-account';
import { AccountDrawerHomePage } from 'src/layouts/components/account-drawer-homepage/AccountDrawerHomePage';
import { navDataDekstop } from 'src/layouts/config-nav-main';
import { NavSectionHorizontal } from 'src/components/nav-section';

const NavbarDekstop = ({ user, isMobile }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const layoutQuery = 'sm';

  return (
    <>
      {!isMobile && (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <NavSectionHorizontal data={navDataDekstop} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {user ? (
              <Box component={'span'}>
                <Box sx={{ marginRight: 2 }} component={'span'}>
                  <NotificationsDrawer data={_notifications} />
                </Box>
                <AccountDrawerHomePage data={_accountUser} currentUser={user} />
              </Box>
            ) : (
              <Box component={'span'}>
                <Stack direction={'row'} alignItems={'center'} columnGap={2}>
                  <Link component={RouterLink} href={paths.auth.signIn}>
                    <Button
                      variant="contained"
                      sx={{
                        paddingX: '20px',
                        paddingY: '10px',
                        backgroundColor: '#fff',
                        color: '#000',
                        '&:hover': {
                          backgroundColor: theme.vars.palette.grey[400],
                        },
                      }}
                    >
                      Sign in
                    </Button>
                  </Link>
                  <Link component={RouterLink} href={paths.postProject}>
                    <Button variant="contained" sx={{ paddingX: '20px', paddingY: '10px' }}>
                      Start Dental Design Now{' '}
                    </Button>
                  </Link>
                </Stack>
              </Box>
            )}
          </Box>
        </>
      )}
    </>
  );
};

export default NavbarDekstop;
