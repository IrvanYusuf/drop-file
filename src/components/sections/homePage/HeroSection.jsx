'use client';
import { Box, Button, Container, Grid, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useQuery } from 'src/hooks/fetch-custom/use-query';
import { useHandleDropFile } from 'src/hooks/use-on-drop-file';

export function HeroSection() {
  const theme = useTheme();
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState(null);
  const modelTypes = ['stl', 'glb'];

  const handleDrop = useHandleDropFile(modelTypes, setFiles, files, true);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
  });
  useEffect(() => {
    if (!files) {
      const storedFiles = localStorage.getItem('files');
      if (storedFiles) {
        setFiles(JSON.parse(storedFiles));
      }
    }
  }, []);

  return (
    <Box
      sx={{
        margin: 0,
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          display: 'inline-flex',
          padding: 1,
          marginBottom: '20px',
        }}
        component={'div'}
        borderRadius={'5px'}
      >
        <Typography fontWeight={700}>Get design with trusted designer</Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <Typography fontWeight={700} sx={{ fontSize: '32px' }}>
            The easiest way to get dental design
          </Typography>
          <Typography sx={{ fontSize: '26px' }} color={theme?.palette?.text.secondary}>
            100% Professional Anyone, Anywhere.
          </Typography>
          <Typography sx={{ fontSize: '24px' }}>by Dentaloka</Typography>
          <Box sx={{ position: 'relative', width: '100%', height: '300px', marginTop: '25px' }}>
            <Image
              src="/assets/images/hero-img.png"
              alt="banner"
              fill={true}
              objectFit="cover"
              style={{ borderRadius: '20px' }}
              quality={100}
            />
          </Box>
        </Grid>
        <Grid item md={6} xs={12}>
          <Box
            {...getRootProps()}
            component={'div'}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
              width: '100%',
              backgroundColor: isDragActive ? '#B9E5E8' : 'white',
              borderRadius: '20px',
              border: { xs: 'none', md: '3px dashed #bababa' },
            }}
          >
            <Box
              sx={{
                width: { xs: '100%', md: '50%' },
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                rowGap: 1,
              }}
            >
              <Box>
                <input
                  {...getInputProps()}
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  type="file"
                />

                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  component="span"
                  onClick={() => fileInputRef.current.click()}
                >
                  Upload File Scan
                </Button>
              </Box>
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <Typography fontWeight={700}>or drop file here</Typography>
                <Typography
                  sx={{ fontSize: '20px', textWrap: 'wrap' }}
                  color={theme?.palette?.text.secondary}
                >
                  add file images JPG/PNG or scan file STL/OBJ
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
