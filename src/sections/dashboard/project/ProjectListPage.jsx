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
import { endpoints } from 'src/routes/endpoints';
import { ProjectTableRow } from './ProjectTableRow';
import { ProjectTableToolbar } from './ProjectTableToolbar';

const TABLE_HEAD = [
  { id: 'no', label: 'No' },
  { id: 'client_name', label: 'Nama Client' },
  { id: 'title', label: 'Title Projek' },
  { id: 'budget', label: 'Budget' },
  { id: 'patient_name', label: 'Nama Pasien' },
  { id: 'patient_nohp', label: 'No Hp Pasien' },
  { id: 'status', label: 'Status' },
  { id: '', width: 88 },
];

const ROW_PER_PAGE_OPTIONS = [5, 10, 20];

const ProjectListPage = () => {
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

  const { data = [] } = useQuery(['projects'], endpoints.project.root);

  console.log(data);

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
        links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'Projek' }]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.rekening.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New Project
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <Card>
        <ProjectTableToolbar handleChangeSearch={() => {}} />
        <Box sx={{ position: 'relative' }}>
          <TableSelectedAction
            dense={table.dense}
            numSelected={table.selected.length}
            rowCount={data.length}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(
                checked,
                data.map((row) => row.project_id)
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
                    data.map((row) => row.project_id)
                  )
                }
              />

              <TableBody>
                {data.map((row, index) => (
                  <ProjectTableRow
                    key={row.project_id}
                    row={row}
                    index={index}
                    selected={table.selected.includes(row.project_id)}
                    onSelectRow={() => table.onSelectRow(row.project_id)}
                    onEditRow={() => handleEditRow(row.project_id)}
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

export default ProjectListPage;
