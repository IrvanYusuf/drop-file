import { Box, Button, Fade, Menu, MenuItem, Stack, useTheme } from '@mui/material';
import Link from '@mui/material/Link';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useState } from 'react';
import { _notifications } from 'src/_mock';
import { Iconify } from 'src/components/iconify';
import { NotificationsDrawer } from 'src/layouts/components/notifications-drawer';
import { _accountUser } from 'src/layouts/config-nav-account';

const NavbarDekstop = ({ user }) => {
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
    <Box
      sx={{
        display: 'none',
        [theme.breakpoints.up(layoutQuery)]: {
          display: 'flex',
          alignItems: 'center',
          columnGap: 2,
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Button
          id="fade-button"
          aria-controls={open ? 'fade-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          //   color={'black'}
          sx={{ color: theme.palette.text.primary }}
        >
          How it Works
          <Iconify width={16} icon="eva:arrow-ios-downward-fill" sx={{ ml: 0.75 }} />
        </Button>
        <Menu
          id="fade-menu"
          MenuListProps={{
            'aria-labelledby': 'fade-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
        <Link component={RouterLink} href={paths.home} color={theme.palette.text.primary}>
          <Button>Blog</Button>
        </Link>
        <Link component={RouterLink} href={paths.client.profile} color={theme.palette.text.primary}>
          <Button>Become a Designer</Button>
        </Link>
        <Link component={RouterLink} href={paths.home} color={theme.palette.text.primary}>
          <Button>Contact Us</Button>
        </Link>
        {user ? (
          <Box component={'span'}>
            <Box sx={{ marginRight: 2 }} component={'span'}>
              <NotificationsDrawer data={_notifications} totalUnRead={5} />
            </Box>
            <AccountDrawerHomePage data={_accountUser} />
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
    </Box>
  );
};

export default NavbarDekstop;
