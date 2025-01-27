'use client';
import {
  Box,
  Button,
  Card,
  IconButton,
  Table,
  TableBody,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useCallback, useState } from 'react';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { Iconify } from 'src/components/iconify';
import {
  emptyRows,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  useTable,
} from 'src/components/table';
import { useBoolean } from 'src/hooks/use-boolean';
import { DashboardContent } from 'src/layouts/dashboard';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { Scrollbar } from 'src/components/scrollbar';
import { ProductTableRow } from './ProductTableRow';
import { useQuery } from 'src/hooks/fetch-custom/use-query';
import { ProductTableToolbar } from './ProductTableToolbar';
import { useDebouncedCallback } from 'use-debounce';

const TABLE_HEAD = [
  { id: 'no', label: 'No' },
  { id: 'name', label: 'Name' },
  { id: 'bahan', label: 'Bahan' },
  { id: 'price', label: 'Price' },
  { id: '', width: 88 },
];

const ROW_PER_PAGE_OPTIONS = [1, 5, 10, 20];

const dummyDentalProducts = [
  {
    product_id: 1,
    name: 'Gigi Palsu Akrilik',
    bahan: 'Akrilik',
    price: 1500000,
  },
  {
    product_id: 2,
    name: 'Gigi Palsu Valplast',
    bahan: 'Valplast',
    price: 2500000,
  },
  {
    product_id: 3,
    name: 'Gigi Palsu Kerangka Logam',
    bahan: 'Logam Cobalt Chrome',
    price: 3500000,
  },
  {
    product_id: 4,
    name: 'Gigi Palsu Komposit',
    bahan: 'Resin Komposit',
    price: 2000000,
  },
  {
    product_id: 5,
    name: 'Gigi Palsu Thermoplastic',
    bahan: 'Thermoplastic Nylon',
    price: 3000000,
  },
  {
    product_id: 6,
    name: 'Gigi Palsu Fleksibel',
    bahan: 'Nylon Fleksibel',
    price: 2800000,
  },
  {
    product_id: 7,
    name: 'Gigi Palsu Penuh Akrilik',
    bahan: 'Akrilik Premium',
    price: 5000000,
  },
  {
    product_id: 8,
    name: 'Gigi Palsu Parsial Valplast',
    bahan: 'Valplast Parsial',
    price: 1800000,
  },
  {
    product_id: 9,
    name: 'Gigi Palsu Hybrid',
    bahan: 'Akrilik dan Logam',
    price: 4000000,
  },
  {
    product_id: 10,
    name: 'Gigi Palsu Zirconia',
    bahan: 'Zirconia',
    price: 8000000,
  },
];

const ProductListPage = () => {
  const table = useTable();
  const confirm = useBoolean();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const debounced = useDebouncedCallback((value) => {
    setSearch(value);
    setPage(0);
  }, 500);

  const notFound = !dummyDentalProducts.length;
  const queryDeps = [search];
  const {
    data: dataProducts,
    isLoading,
    pagination,
  } = useQuery(['products', ...queryDeps], '/api/v1/products', {
    params: {
      search,
    },
    keepPreviousData: true,
  });

  const handleChangeSearch = (event) => debounced(event.target.value);

  const handleEditRow = useCallback(
    (id) => {
      router.push(paths.dashboard.product.edit(id));
    },
    [router]
  );

  const handleRowsPerPageChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (_, newPage) => setPage(newPage);
  if (isLoading) {
    return <Typography>loading....</Typography>;
  }
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="List"
        links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'Product' }]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.product.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New Product
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <Card>
        <ProductTableToolbar handleChangeSearch={handleChangeSearch} />
        <Box sx={{ position: 'relative' }}>
          <TableSelectedAction
            dense={table.dense}
            numSelected={table.selected.length}
            rowCount={dataProducts.length}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(
                checked,
                dataProducts.map((row) => row.product_id)
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
                rowCount={dataProducts.length}
                numSelected={null}
                onSort={() => {}}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    dataProducts.map((row) => row.product_id)
                  )
                }
              />

              <TableBody>
                {dataProducts.map((row, index) => (
                  <ProductTableRow
                    key={row.product_id}
                    row={row}
                    index={index}
                    selected={table.selected.includes(row.product_id)}
                    onSelectRow={() => table.onSelectRow(row.product_id)}
                    onEditRow={() => handleEditRow(row.product_id)}
                  />
                ))}

                <TableEmptyRows
                  height={table.dense ? 56 : 56 + 20}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, dataProducts.length)}
                />

                <TableNoData notFound={notFound} />
              </TableBody>
            </Table>
          </Scrollbar>
        </Box>
      </Card>
      <TablePaginationCustom
        page={page}
        dense={table.dense}
        count={pagination?.total ?? 0}
        rowsPerPage={limit}
        rowsPerPageOptions={ROW_PER_PAGE_OPTIONS}
        onPageChange={handlePageChange}
        onChangeDense={table.onChangeDense}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </DashboardContent>
  );
};

export default ProductListPage;
