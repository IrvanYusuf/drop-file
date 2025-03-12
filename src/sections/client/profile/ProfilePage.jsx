'use client';
import { Box, Link, Typography } from '@mui/material';
import { useAuthContext } from 'src/auth/hooks';
import { Iconify } from 'src/components/iconify';
import { useQuery } from 'src/hooks/fetch-custom/use-query';
import { RouterLink } from 'src/routes/components';
import { endpoints } from 'src/routes/endpoints';
import { paths } from 'src/routes/paths';
import { AccountGeneral } from 'src/sections/dashboard/user/detail/account-general';

const ProfilePage = () => {
  const { user } = useAuthContext();

  if (!user) {
    return (
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Iconify
          icon="eva:lock-fill"
          sx={{ mr: 1 }}
          width={48}
          height={48}
          color="text.secondary"
        />
        <Typography variant="body2" color="text.secondary" display="flex" alignItems="center">
          You need to sign in to view your profile information.{' '}
          <Link
            component={RouterLink}
            href={paths.auth.signIn}
            color="primary"
            underline="hover"
            sx={{ ml: '4px' }}
          >
            Sign in here.
          </Link>
        </Typography>
      </Box>
    );
  }

  const { data: [dataDetailUser] = [], isLoading } = useQuery(
    [`detail-user-${user.user_id}`],
    `${endpoints.user.root}/${user.user_id}`
  );

  return (
    <AccountGeneral
      currentUser={dataDetailUser}
      isEditButtonShow={true}
      buttonVerifyAccountShow={true}
    />
  );
};

export default ProfilePage;
