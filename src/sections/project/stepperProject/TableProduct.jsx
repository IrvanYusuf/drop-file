import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Typography } from '@mui/material';
import { FormatCurrencyRupiah } from 'src/utils/currency-format';

export default function TableProduct({ selectedProduct = [], handleDeleteProductInTable }) {
  let no = 0;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Produk</TableCell>
            <TableCell align="right">Warna</TableCell>
            <TableCell align="right">Posisi</TableCell>
            <TableCell align="right">Harga</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedProduct.length > 0 ? (
            selectedProduct.map((product, i) =>
              product.positions.map((position, index) => {
                no++;
                return (
                  <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {no}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {product.productName}
                    </TableCell>
                    <TableCell align="right">{product.color}</TableCell>
                    <TableCell align="right">{position}</TableCell>
                    <TableCell align="right">
                      {FormatCurrencyRupiah.format(product.price)}
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{ color: 'red', cursor: 'pointer' }}
                      onClick={() => handleDeleteProductInTable(position)}
                    >
                      Hapus
                    </TableCell>
                  </TableRow>
                );
              })
            )
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center" style={{ textAlign: 'center' }}>
                <Typography>No Produk</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
