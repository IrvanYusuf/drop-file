import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Typography } from '@mui/material';
import { FormatCurrencyRupiah } from 'src/utils/currency-format';

const TableProductDetail = ({ products }) => {
  let no = 0;

  // Menghitung total harga
  const totalHarga = products.reduce((total, product) => {
    return total + product.price * product.positions.length;
  }, 0);

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
          </TableRow>
        </TableHead>
        <TableBody>
          {products && products.length > 0 ? (
            products.map((product, i) =>
              product.positions.map((position, index) => {
                no++;
                return (
                  <TableRow
                    key={`${i}-${index}`}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {no}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {product.name}
                    </TableCell>
                    <TableCell align="right">{product.color}</TableCell>
                    <TableCell align="right">{position}</TableCell>
                    <TableCell align="right">
                      {FormatCurrencyRupiah.format(product.price)}
                    </TableCell>
                  </TableRow>
                );
              })
            )
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <Typography>No Produk</Typography>
              </TableCell>
            </TableRow>
          )}

          {/* Baris Total Harga */}
          {products.length > 0 && (
            <TableRow>
              <TableCell colSpan={4} align="right">
                <Typography variant="subtitle1" fontWeight="bold">
                  Total Harga:
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle1" fontWeight="bold">
                  {FormatCurrencyRupiah.format(totalHarga)}
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableProductDetail;
