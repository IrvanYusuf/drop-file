'use client';
import {
  Box,
  InputAdornment,
  Link,
  Pagination,
  paginationClasses,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { useQuery } from 'src/hooks/fetch-custom/use-query';
import { endpoints } from 'src/routes/endpoints';
import { useAuthContext } from 'src/auth/hooks';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import ProjectItem from '../project/ProjectItem';

const ProjectAvailablePage = ({ isBrowsePage = false }) => {
  const { user } = useAuthContext();
  const { data: listProjectAvailable = [], isLoading: loadingProjectAvailable } = useQuery(
    [`list-project-available`],
    `${endpoints.project.root}/available`
  );

  return (
    <>
      {listProjectAvailable.length > 0 ? (
        <Box gap={3} display="grid" gridTemplateColumns={'repeat(1, 1fr)'}>
          <Stack
            direction="row"
            justifyContent={'end'}
            alignItems="center"
            spacing={2}
            flexGrow={1}
            sx={{ width: 1 }}
          >
            <TextField
              sx={{ width: 0.6 }}
              // value={defaultValue}
              onChange={() => {}}
              placeholder="Search..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          {listProjectAvailable &&
            listProjectAvailable.map((project, index) => (
              <ProjectItem
                project={project}
                key={project.project_id}
                user={user}
                isBrowsePage={isBrowsePage}
              />
            ))}
          <Pagination
            count={8}
            sx={{
              mt: { xs: 8, md: 8 },
              [`& .${paginationClasses.ul}`]: { justifyContent: 'center' },
            }}
          />
        </Box>
      ) : (
        <Box
          textAlign="center"
          py={4}
          sx={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Iconify
            icon="solar:sleeping-circle-bold"
            width={48}
            height={48}
            color="text.secondary"
          />
          <Typography variant="body2" color="text.secondary">
            Oops! No Projects Available Right Now
          </Typography>
        </Box>
      )}
    </>
  );
};

export default ProjectAvailablePage;
