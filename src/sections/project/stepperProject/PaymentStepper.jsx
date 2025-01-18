import { Box, Button, Card, CardContent, Divider, Stack, Tooltip, Typography } from '@mui/material';
import { useAuthContext } from 'src/auth/hooks';
import { toast } from 'src/components/snackbar';
const PaymentStepper = ({ handleBack }) => {
  const { user } = useAuthContext();
  const handlePayment = () => {
    toast.success('Berhasil');
  };
  const handleSaveProject = () => {
    toast.success('Berhasil simpan projek');
  };
  return (
    <div>
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant="h6">Detail Client</Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body1">Irvan Yusuf Cahyadi</Typography>
          <Typography variant="body2">irvan@gmail.com</Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="h6">Detail Pasien</Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body1">Pasien 1</Typography>
          <Typography variant="body2">081234567890</Typography>
        </CardContent>
      </Card>
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant="h6">Detail Produk</Typography>
          <Divider sx={{ my: 1 }} />
          {Array.from({ length: 3 }).map((value) => (
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
              sx={{ mb: 2 }}
            >
              <Box>
                <Typography variant="body1">Produk A</Typography>
                <Typography variant="body2">AA</Typography>
              </Box>
              <Typography variant="body1" fontWeight={'bold'}>
                Rp 1000
              </Typography>
            </Stack>
          ))}
        </CardContent>
      </Card>
      <Stack justifyContent={'center'} sx={{ width: '100%' }} alignItems={'end'}>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
            Back
          </Button>

          <Tooltip
            title={!user ? 'Anda harus login untuk simpan projek' : ''}
            arrow
            placement="top"
          >
            {/* Wrapping Button in a span for proper Tooltip behavior on disabled */}
            <span>
              <Button
                type="submit"
                variant="outlined"
                sx={{ mr: 1 }}
                disabled={!user}
                onClick={handleSaveProject}
              >
                Simpan Projek
              </Button>
            </span>
          </Tooltip>
          <Tooltip
            title={!user ? 'Anda harus login untuk melalukan pembayaran' : ''}
            arrow
            placement="top"
          >
            {/* Wrapping Button in a span for proper Tooltip behavior on disabled */}
            <span>
              <Button
                type="submit"
                variant="contained"
                onClick={handlePayment}
                disabled={!user} // Button disabled if user does not exist
              >
                Bayar
              </Button>
            </span>
          </Tooltip>
        </Box>
      </Stack>
    </div>
  );
};

export default PaymentStepper;
