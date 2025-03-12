import { Box, Button, Grid, IconButton, Stack, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import Slider from 'react-slick';
import { Iconify } from 'src/components/iconify';
import { useMutation } from 'src/hooks/fetch-custom/use-mutation';
import { useHandleDropFile } from 'src/hooks/use-on-drop-file';
import { toast } from 'src/components/snackbar';
import axios from 'axios';
const PostProjectSectionImage = ({ setFiles, files }) => {
  const fileInputRef = useRef(null);
  const theme = useTheme();

  const [filesUpload, setFilesUpload] = useState([]);

  const handleRemoveImg = (index) => {
    const filteredFiles = files.filter((_, idx) => idx !== index);
    localStorage.setItem('files', JSON.stringify(filteredFiles));
    setFiles(filteredFiles);
  };

  const modelTypes = ['stl', 'glb'];
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dotsClass: 'slick-dots slick-thumb',
  };

  const handleDropFile = useHandleDropFile(modelTypes, setFiles, files, false);

  const { getInputProps, getRootProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop: handleDropFile,
  });

  const { mutate: createNewProject } = useMutation('POST', '/api/v1/projects');
  const methods = useForm({
    defaultValues: { files: [] },
  });

  const {
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = methods;

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();

    data.files.forEach((img) => {
      console.log('append img', img);
      formData.append('images', img);
    });
    try {
      createNewProject(formData, {
        onSuccess: (response) => {
          toast.success('success create project');
        },
      });
      console.log('data', data);
      console.log('form data', formData);
    } catch (error) {
      toast.error('failed create project');
    }
  });

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      setFilesUpload(acceptedFiles);
      setValue('files', acceptedFiles);
      console.log('acc files', acceptedFiles);
    }
  }, [acceptedFiles]);

  return (
    <Grid
      item
      xs={12}
      md={6}
      sx={{
        backgroundColor: '#E8F2FE',
        borderRadius: '15px 0 0 15px',
        padding: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {files && files.length > 0 ? (
        <>
          {files.length === 1 ? (
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: '350px',
                backgroundRepeat: 'no-repeat',
              }}
              component={'div'}
            >
              <Image src={files[0].url} alt="banner" fill={true} objectFit="cover" quality={100} />
            </Box>
          ) : (
            <Box component={'div'} className="slider-container">
              <Slider {...settings}>
                {files.map((file, index) => (
                  <Box key={index}>
                    <Box
                      sx={{
                        position: 'relative',
                        width: '100%',
                        height: '350px',
                        backgroundRepeat: 'no-repeat',
                        display: 'block',
                      }}
                      component={'div'}
                    >
                      {!modelTypes.includes(file.type_ext) ? (
                        <Image
                          src={file.url ?? ''}
                          alt="thumbnail"
                          fill={true}
                          objectFit="cover"
                          style={{ borderRadius: '6px' }}
                          quality={100}
                        />
                      ) : (
                        <Box
                          sx={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '28px',
                          }}
                        >
                          {file && file.name}
                        </Box>
                      )}
                    </Box>
                  </Box>
                ))}
              </Slider>
            </Box>
          )}
          <Stack direction="row" spacing={2} sx={{ marginTop: 8 }} justifyContent={'space-between'}>
            <Stack
              spacing={2}
              direction="row"
              maxWidth={'100%'}
              sx={{ overflowX: 'auto' }}
              width={'100%'}
            >
              {files.map((file, index) => (
                <Box
                  key={index}
                  sx={{
                    position: 'relative',
                    width: '60px',
                    height: '60px',
                    minWidth: '60px',
                    border: '2px solid #3FA2ED',
                    borderRadius: '6px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {file.url ? (
                    <Image
                      src={file.url ?? ''}
                      alt="thumbnail"
                      objectFit="cover"
                      style={{ borderRadius: '6px' }}
                      quality={100}
                      width={60} // Ukuran tetap agar gambar tidak terpengaruh ukuran kontainer
                      height={60}
                    />
                  ) : (
                    // <img src={file.url} alt="" style={{ width: '100%', height: '100%' }} />
                    file.type_ext
                  )}

                  <IconButton
                    size="small"
                    onClick={() => handleRemoveImg(index)}
                    sx={{
                      position: 'absolute',
                      right: -8,
                      top: -4,
                      backgroundColor: '#FF5630',
                    }}
                    variant="contained"
                  >
                    <Iconify icon="mingcute:close-line" width={10} color="white" />
                  </IconButton>
                </Box>
              ))}
            </Stack>
            <Box>
              <input
                {...getInputProps()}
                ref={fileInputRef}
                style={{ display: 'none' }}
                type="file"
              />

              <Button
                sx={{
                  width: '60px',
                  height: '60px',
                  border: '2px solid #3FA2ED',
                  borderRadius: '6px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                component="div"
                onClick={() => fileInputRef.current.click()}
              >
                <Iconify icon="gridicons:add" width={26} />
              </Button>
            </Box>
          </Stack>
        </>
      ) : (
        <Box
          {...getRootProps()}
          component={'div'}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            height: '300px',
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
      )}
    </Grid>
  );
};

export default PostProjectSectionImage;
