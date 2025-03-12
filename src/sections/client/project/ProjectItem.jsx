'use client';
import {
  Avatar,
  Box,
  Card,
  IconButton,
  Link,
  MenuItem,
  MenuList,
  Stack,
  Typography,
} from '@mui/material';
import { CustomPopover, usePopover } from 'src/components/custom-popover';
import { Iconify } from 'src/components/iconify';
import { Label } from 'src/components/label';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { fDate } from 'src/utils/format-time';

const ProjectItem = ({ project, user, isBrowsePage = false }) => {
  const popover = usePopover();
  let statusColor = 'warning';
  if (project) {
    if (project.status === 'Completed') {
      statusColor = 'success';
    } else if (project.status === 'On Progress') {
      statusColor = 'secondary';
    } else if (project.status === 'Pending') {
      statusColor = 'warning';
    } else if (project.status === 'Closed') {
      statusColor = 'error';
    }
  }

  const pathDetailProject = isBrowsePage
    ? paths.browseProject.detail(project.project_id)
    : paths.client.projects.detail(project.project_id);
  return (
    <Card>
      <IconButton onClick={popover.onOpen} sx={{ position: 'absolute', top: 8, right: 8 }}>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>
      <Stack sx={{ p: 3, pb: 2 }} direction={'row'} alignItems={'center'} gap={2}>
        <Avatar
          alt={''}
          src={'https://assets.minimals.cc/public/assets/images/mock/company/company-1.webp'}
          variant="rounded"
          sx={{ width: 48, height: 48 }}
        />
        <Link
          component={RouterLink}
          href={pathDetailProject}
          sx={{
            color: 'inherit',
            '&:hover': {
              color: 'inherit',
              textDecoration: 'none',
            },
          }}
        >
          <Box>
            <Typography>{project.title}</Typography>
            <Stack direction={'row'} alignItems={'center'} columnGap={1}>
              <Typography variant="subtitle2" color="text.secondary">
                {fDate(project.created_at)}
              </Typography>
              <Box
                component="span"
                sx={{
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  bgcolor: 'text.disabled',
                }}
              />
              <Label variant="soft" color={statusColor}>
                {project.status}
              </Label>
            </Stack>
          </Box>
        </Link>
      </Stack>
      <Typography variant="subtitle2" color="text.secondary" px={3} pb={1}>
        {project.description}
      </Typography>
      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'top-right' } }}
      >
        <MenuList>
          <Link
            component={RouterLink}
            href={pathDetailProject}
            sx={{
              color: 'inherit',
              '&:hover': {
                color: 'inherit',
                textDecoration: 'none',
              },
            }}
          >
            <MenuItem>
              <Iconify icon="solar:eye-bold" />
              Detail
            </MenuItem>
          </Link>
          {user && user.role === 'WORKER' ? (
            <MenuItem
              onClick={() => {
                popover.onClose();
              }}
            >
              <Iconify icon="solar:clipboard-check-bold" />
              Take Project
            </MenuItem>
          ) : (
            <MenuItem
              onClick={() => {
                popover.onClose();
                onEdit();
              }}
            >
              <Iconify icon="solar:pen-bold" />
              Edit
            </MenuItem>
          )}
        </MenuList>
      </CustomPopover>
    </Card>
  );
};

export default ProjectItem;
