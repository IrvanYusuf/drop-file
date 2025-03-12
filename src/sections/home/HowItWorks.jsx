'use client';
import { Box, Card, CardContent, CardMedia, Grid, Typography, useTheme } from '@mui/material';
import { color, distance } from 'framer-motion';
import { Iconify } from 'src/components/iconify';
import { SectionTitle } from 'src/components/section-title/SectionTitle';
import { m } from 'framer-motion';
import { MotionViewport, varFade } from 'src/components/animate';

const dataCardHowItWorks = [
  {
    title: 'Upload File Scan',
    desc: "Easily upload your patient's dental scan files in STL, OBJ, or JPG format to kickstart the process.",
    icon: {
      name: 'solar:upload-square-bold-duotone', // Ikon untuk mengunggah
      color: '#d33636', // Merah untuk menarik perhatian
    },
  },
  {
    title: 'Review and Discuss',
    desc: 'Collaborate with our team to review and discuss the details of the uploaded scan for a perfect design.',
    icon: {
      name: 'solar:chat-round-line-bold', // Ikon untuk diskusi
      color: '#f39c12', // Oranye untuk mencerminkan keterlibatan
    },
  },
  {
    title: 'Final Design',
    desc: 'Receive the finalized design, customized to your specifications, and ready for production.',
    icon: {
      name: 'solar:check-circle-bold-duotone', // Ikon untuk hasil akhir
      color: '#2ecc71', // Hijau untuk menyimbolkan hasil sukses
    },
  },
  {
    title: 'Production',
    desc: 'The finalized design is brought to life using state-of-the-art production techniques.',
    icon: {
      name: 'solar:box-minimalistic-bold-duotone', // Ikon untuk produksi
      color: '#3498db', // Biru untuk menonjolkan teknologi
    },
  },
];

const HowItWorks = () => {
  const theme = useTheme();
  return (
    <MotionViewport>
      <Box sx={{ mt: 10 }}>
        <SectionTitle
          caption={null}
          title="How it's"
          txtGradient="works"
          description={'Get Started with 4 easy steps'}
          sx={{ mb: 8, textAlign: 'center' }}
        />
        <Grid container spacing={4}>
          {dataCardHowItWorks.map((data, index) => (
            <Grid item xs={12} sm={3} key={index}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingY: 5,
                  height: '100%',
                }}
              >
                <m.div variants={varFade({ distance: 50 }).inUp}>
                  <Iconify icon={data.icon.name} width={70} style={{ color: data.icon.color }} />
                </m.div>
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    py: 1,
                  }}
                >
                  <Typography gutterBottom variant="h5" component="div">
                    {data.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                    {data.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </MotionViewport>
  );
};

export default HowItWorks;
