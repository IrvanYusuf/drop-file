import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Typography } from '@mui/material';

export default function TableProduct({ selectedProduct = [] }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Produk</TableCell>
            <TableCell align="right">Warna</TableCell>
            <TableCell align="right">Harga</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedProduct.length > 0 ? (
            selectedProduct.map((row, i) => (
              <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  Produk A
                </TableCell>
                <TableCell align="right">AA</TableCell>
                <TableCell align="right">Rp 1000</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center" style={{ textAlign: 'center' }}>
                <Typography>No Produk</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
