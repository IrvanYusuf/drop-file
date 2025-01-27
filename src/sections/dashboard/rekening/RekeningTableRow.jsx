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
// ----------------------------------------------------------------------

export function RekeningTableRow({ row, index, selected, onSelectRow }) {
  const confirm = useBoolean();

  const popover = usePopover();
  const { mutate: deleteBahanData } = useMutation('DELETE', `/api/v1/bahan/${row.bahan_id}`, {
    onSuccess: () => {
      queryClient.invalidateQueries(['bahan']);
      toast.success('Delete success!');
      confirm.onFalse();
    },
  });

  const handleDeleteConfirm = () => deleteBahanData();

  return (
    <>
      <TableRow hover selected={selected} aria-checked={selected} tabIndex={-1}>
        <TableCell padding="checkbox">
          <Checkbox id={row.rekening_id} checked={selected} onClick={onSelectRow} />
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
            href={paths.dashboard.bahan.detail(row.rekening_id)}
            sx={{ cursor: 'pointer' }}
          >
            {row.name_rekening}
          </Link>
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.no_rekening}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.bank_name}</TableCell>
        <TableCell>
          <Label variant="soft" color={row.is_active === 1 ? 'success' : 'error'}>
            {row.is_active === 1 ? 'active' : 'inactive'}
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
            href={paths.dashboard.bahan.detail(row.rekening_id)}
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
