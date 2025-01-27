'use client';

import { Box, Container, Grid } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PostProjectSectionImage from './PostProjectSectionImage';
import PostProjectForm from './PostProjectForm';
import { useState } from 'react';

export default function PostProjectSection() {
  const [files, setFiles] = useState(null);

  const [formData, setFormData] = useState({
    files: [],
    title: '',
    description: '',
    product: '',
    color: '',
    position: [],
    products: [],
    patients: { patientName: '', patientPhone: '' },
  });
  return (
    <Box sx={{ margin: 0 }}>
      <Container>
        <Grid container>
          <PostProjectSectionImage setFiles={setFiles} files={files} />
          <Grid
            item
            xs={12}
            md={6}
            sx={{ backgroundColor: 'white', borderRadius: '0 15px 15px 0', padding: 2 }}
          >
            <PostProjectForm formData={formData} setFormData={setFormData} files={files} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
