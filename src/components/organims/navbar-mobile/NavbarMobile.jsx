import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { Link, Stack, useTheme } from '@mui/material';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { MenuButton } from 'src/layouts/components/menu-button';
import { navData } from 'src/layouts/config-nav-main';
import { NavSectionVertical } from 'src/components/nav-section';
import { useAuthContext } from 'src/auth/hooks';

export default function NavMobile({ isMobile }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const { user } = useAuthContext();

  const navDataFilter = user
    ? navData
    : navData.filter((section) => section.subheader !== 'User Menu');

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box role="presentation">
      <List>
        <NavSectionVertical data={navDataFilter} />
      </List>
      <Divider />
      <Stack
        direction={'column'}
        alignItems={'center'}
        rowGap={2}
        sx={{ marginTop: 3, width: '100%', paddingX: 2 }}
      >
        <Link component={RouterLink} href={paths.auth.signIn} sx={{ width: '100%' }}>
          <Button
            fullWidth
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
        <Link component={RouterLink} href={''} sx={{ width: '100%' }}>
          <Button fullWidth variant="contained" sx={{ paddingX: '20px', paddingY: '10px' }}>
            Start Dental Design Now{' '}
          </Button>
        </Link>
      </Stack>
    </Box>
  );

  return (
    <>
      {isMobile && (
        <Box>
          <MenuButton onClick={toggleDrawer(true)} />
          <Drawer
            open={open}
            onClose={toggleDrawer(false)}
            PaperProps={{
              sx: { width: '75%' }, // Mengatur lebar drawer menjadi 75%
            }}
          >
            {DrawerList}
          </Drawer>
        </Box>
      )}
    </>
  );
}
