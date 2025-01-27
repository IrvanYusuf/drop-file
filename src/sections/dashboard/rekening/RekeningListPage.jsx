'use client';
import { Box, Button, Card, IconButton, Table, TableBody, Tooltip } from '@mui/material';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import {
  emptyRows,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  useTable,
} from 'src/components/table';
import { DashboardContent } from 'src/layouts/dashboard';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';
import { useQuery } from 'src/hooks/fetch-custom/use-query';
import { useCallback, useState } from 'react';
import { useRouter } from 'src/routes/hooks';
import { useDebouncedCallback } from 'use-debounce';
import { RekeningTableRow } from './RekeningTableRow';
import { RekeningTableToolbar } from './RekeningTableToolbar';

const TABLE_HEAD = [
  { id: 'no', label: 'No' },
  { id: 'bahan', label: 'Nama Pemilik' },
  { id: 'bahan', label: 'No Rekening' },
  { id: 'bahan', label: 'Nama Bank' },
  { id: 'bahan', label: 'Status' },
  { id: '', width: 88 },
];

const ROW_PER_PAGE_OPTIONS = [5, 10, 20];

const RekeningListPage = () => {
  const table = useTable();
  const confirm = useBoolean();
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const debounced = useDebouncedCallback((value) => {
    setSearch(value);
  }, 500);

  const queryDeps = [search, page, limit];
  // const { data = [], isLoading } = useQuery(['bahan'], '/api/v1/bahan');
  const { data = [], isLoading, pagination } = useQuery(['rekening'], '/api/v1/rekening');

  const filters = useSetState({ bahan: search });

  const handleEditRow = useCallback(
    (id) => {
      router.push(paths.dashboard.bahan.edit(id));
    },
    [router]
  );

  const handleRowsPerPageChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (_, newPage) => setPage(newPage);
  const handleChangeSearch = (event) => debounced(event.target.value);
  const notFound = !data.length;

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="List"
        links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'Rekening' }]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.rekening.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New Rekening
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <Card>
        <RekeningTableToolbar handleChangeSearch={() => {}} />
        <Box sx={{ position: 'relative' }}>
          <TableSelectedAction
            dense={table.dense}
            numSelected={table.selected.length}
            rowCount={data.length}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(
                checked,
                data.map((row) => row.rekening_id)
              )
            }
            action={
              <Tooltip title="Delete">
                <IconButton color="primary" onClick={confirm.onTrue}>
                  <Iconify icon="solar:trash-bin-trash-bold" />
                </IconButton>
              </Tooltip>
            }
          />
          <Scrollbar>
            <Table size={table.dense ? 'small' : 'medium'}>
              <TableHeadCustom
                order={null}
                orderBy={null}
                headLabel={TABLE_HEAD}
                rowCount={data.length}
                numSelected={null}
                onSort={() => {}}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    data.map((row) => row.rekening_id)
                  )
                }
              />

              <TableBody>
                {data.map((row, index) => (
                  <RekeningTableRow
                    key={row.rekening_id}
                    row={row}
                    index={index}
                    selected={table.selected.includes(row.rekening_id)}
                    onSelectRow={() => table.onSelectRow(row.rekening_id)}
                    onEditRow={() => handleEditRow(row.rekening_id)}
                  />
                ))}

                <TableEmptyRows
                  height={table.dense ? 56 : 56 + 20}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, data.length)}
                />

                <TableNoData notFound={notFound} />
              </TableBody>
            </Table>
          </Scrollbar>
        </Box>
      </Card>
    </DashboardContent>
  );
};

export default RekeningListPage;
