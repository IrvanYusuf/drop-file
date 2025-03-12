import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { useBoolean } from 'src/hooks/use-boolean';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useMutation } from 'src/hooks/fetch-custom/use-mutation';
import { queryClient } from 'src/libs/query-client';
import { toast } from 'src/components/snackbar';
import { endpoints } from 'src/routes/endpoints';
import { FormatCurrencyRupiah } from 'src/utils/currency-format';
// ----------------------------------------------------------------------

export function ProjectTableRow({ row, index, selected, onSelectRow }) {
  const confirm = useBoolean();

  const popover = usePopover();
  //   const { mutate: deleteRekeningData } = useMutation(
  //     'DELETE',
  //     `${endpoints.rekening.root}/${row.rekening_id}`,
  //     {
  //       onSuccess: () => {
  //         queryClient.invalidateQueries(['bahan']);
  //         toast.success('Delete success!');
  //         confirm.onFalse();
  //       },
  //     }
  //   );

  //   const handleDeleteConfirm = () => deleteRekeningData();
  const handleDeleteConfirm = () => {};

  let statusColor = 'warning';
  if (row.status === 'Completed') {
    statusColor = 'success';
  } else if (row.status === 'On Progress') {
    statusColor = 'secondary';
  } else if (row.status === 'Pending') {
    statusColor = 'warning';
  } else if (row.status === 'Closed') {
    statusColor = 'error';
  }
  return (
    <>
      <TableRow hover selected={selected} aria-checked={selected} tabIndex={-1}>
        <TableCell padding="checkbox">
          <Checkbox id={row.project_id} checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell>
          <Stack spacing={2} direction="row" alignItems="center">
            <Box component="span">{index + 1}</Box>
          </Stack>
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          <Link
            color="inherit"
            component={RouterLink}
            href={paths.dashboard.projek.detail(row.project_id)}
            sx={{ cursor: 'pointer' }}
          >
            {row.client_name}
          </Link>
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          {row.title.length > 20 ? row.title.substring(0, 20) + '...' : row.title}
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          {FormatCurrencyRupiah.format(row.budget)}
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.patient_name}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.patient_nohp}</TableCell>
        <TableCell>
          <Label variant="soft" color={statusColor}>
            {row.status}
          </Label>
        </TableCell>

        {/* <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.role}</TableCell> */}

        <TableCell>
          <Stack direction="row" alignItems="center">
            <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              confirm.onTrue();
              popover.onClose();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
          <Link
            color="inherit"
            component={RouterLink}
            href={paths.dashboard.projek.detail(row.project_id)}
          >
            <MenuItem>
              <Iconify icon="solar:pen-bold" />
              Edit
            </MenuItem>
          </Link>
        </MenuList>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        }
      />
    </>
  );
}
