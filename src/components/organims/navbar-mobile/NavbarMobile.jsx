import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { Collapse, Link, ListItemText, Stack, useTheme } from '@mui/material';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { Iconify } from 'src/components/iconify';
import { MenuButton } from 'src/layouts/components/menu-button';
import { navData } from 'src/layouts/config-nav-main';

export default function NavMobile({ isMobile }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState({});

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleDropdownToggle = (index) => () => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const DrawerList = (
    <Box role="presentation">
      <List>
        {navData.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={item.children ? handleDropdownToggle(index) : null}>
                <ListItemText primary={item.title} />
                {item.children &&
                  (dropdownOpen[index] ? (
                    <Iconify width={22} icon="solar:alt-arrow-up-linear" />
                  ) : (
                    <Iconify width={22} icon="solar:alt-arrow-down-linear" />
                  ))}
              </ListItemButton>
            </ListItem>
            {item.children && (
              <Collapse in={dropdownOpen[index]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.children.map((subItem, subIndex) => (
                    <ListItem key={subIndex} disablePadding>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary={subItem.title} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
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
