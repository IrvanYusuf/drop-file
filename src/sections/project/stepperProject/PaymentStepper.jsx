import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useForm } from 'react-hook-form';
import { useAuthContext } from 'src/auth/hooks';
import { Iconify } from 'src/components/iconify';
import { Label } from 'src/components/label';
import { toast } from 'src/components/snackbar';
import { useQuery } from 'src/hooks/fetch-custom/use-query';
import { paymentStepperSchemaValidation } from 'src/schema-validations/stepper/projectStepperSchemaValidation';
import { FormatCurrencyRupiah } from 'src/utils/currency-format';
const PaymentStepper = ({ handleBack, onValid, formData, files }) => {
  const [copiedState, setCopiedState] = useState({});

  const { user } = useAuthContext();
  const methods = useForm({
    resolver: zodResolver(paymentStepperSchemaValidation),
    defaultValues: { ...formData, files: [] },
  });

  const { data: dataRekening = [], isLoading } = useQuery(['rekening'], '/api/v1/rekening');

  const {
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = methods;

  const onSubmit = handleSubmit((data) => {
    // Mengambil nilai terbaru dari form (data)
    const formValues = getValues(); // Ambil data form secara langsung
    console.log(errors);

    // Jika tidak ada error pada formState.errors
    if (Object.keys(errors).length === 0) {
      // Tidak ada error, tampilkan toast sukses
      toast.success('Form submitted successfully!');

      // Kirimkan data ke parent menggunakan callback onValid (jika ada)
      console.log(formValues); // Menampilkan data form yang valid
    } else {
      // Ada error, jangan kirim data
      toast.error('Please fix the errors in the form.');
    }
  });

  console.log(errors);

  const handleSaveProject = () => {
    toast.success('Berhasil simpan projek');
  };

  const detailProducts = watch('products') || [];
  const detailPatients = watch('patients') || {};

  const handleCopy = (id) => {
    setCopiedState((prevState) => ({
      ...prevState,
      [id]: true, // Tandai rekening tertentu sebagai "copied"
    }));

    // Reset status "copied" setelah 3 detik
    setTimeout(() => {
      setCopiedState((prevState) => ({
        ...prevState,
        [id]: false,
      }));
    }, 3000);
  };
  const filesData = watch('files');
  useEffect(() => {
    if (files) {
      console.log('Files received:', files);
      const mappedFiles = files.map((file) => ({
        file: file.file,
      }));
      console.log('Mapped files:', mappedFiles);
      setValue('files', mappedFiles, { shouldValidate: true });
    }
  }, [files, setValue]);

  console.log(getValues());
  if (isLoading) {
    return <Typography>loading....</Typography>;
  }

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
          <Typography variant="body1">{detailPatients.patientName}</Typography>
          <Typography variant="body2">{detailPatients.patientPhone}</Typography>
        </CardContent>
      </Card>
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant="h6">Detail Produk</Typography>
          <Divider sx={{ my: 1 }} />
          {detailProducts.map((product) =>
            product.positions.map((position) => (
              <Stack
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                sx={{ mb: 2 }}
                key={`${product.productName}-${product.color}-${product.price}-${position}`}
              >
                <Box>
                  <Typography variant="body1">{product.productName}</Typography>
                  <Typography variant="body2">{product.color}</Typography>
                </Box>
                <Typography variant="body1" fontWeight={'bold'}>
                  {FormatCurrencyRupiah.format(product.price)}
                </Typography>
              </Stack>
            ))
          )}
        </CardContent>
      </Card>
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant="h6">Metode Pembayaran</Typography>
          <Divider sx={{ my: 1 }} />
          {dataRekening.map((rekening, i) => (
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
              sx={{ mb: 2 }}
              key={i}
            >
              <Box>
                <Typography variant="body1" fontWeight={'bold'}>
                  {rekening.bank_name}
                </Typography>
                <Typography variant="body2">a.n. {rekening.name_rekening}</Typography>
              </Box>
              <Typography variant="body1" fontWeight={'bold'}>
                {rekening.no_rekening}
                <Tooltip title={'copy no rekening'} arrow placement="top">
                  <span>
                    <CopyToClipboard
                      text={rekening.no_rekening}
                      onCopy={() => handleCopy(rekening.rekening_id)}
                    >
                      <IconButton size="small">
                        <Iconify width={18} icon="solar:copy-bold" />
                      </IconButton>
                    </CopyToClipboard>
                  </span>
                </Tooltip>
                {copiedState[rekening.rekening_id] && (
                  <Label variant="soft" color={'success'}>
                    copied
                  </Label>
                )}
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
                onClick={onSubmit}
                disabled={!user} // Button disabled if user does not exist
              >
                Tambah Projek
              </Button>
            </span>
          </Tooltip>
        </Box>
      </Stack>
    </div>
  );
};

export default PaymentStepper;
