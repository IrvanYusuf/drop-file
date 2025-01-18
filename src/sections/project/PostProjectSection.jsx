'use client';

import { Box, Container, Grid } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PostProjectSectionImage from './PostProjectSectionImage';
import PostProjectForm from './PostProjectForm';

export default function PostProjectSection() {
  return (
    <Box sx={{ margin: 0 }}>
      <Container>
        <Grid container>
          <PostProjectSectionImage />
          <Grid
            item
            xs={12}
            md={4.5}
            sx={{ backgroundColor: 'white', borderRadius: '0 15px 15px 0', padding: 2 }}
          >
            <PostProjectForm />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
