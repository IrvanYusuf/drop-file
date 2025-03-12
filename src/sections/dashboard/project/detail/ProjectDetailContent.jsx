import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import Image from 'next/image';
import { fCurrency } from 'src/utils/format-number';
import { toast } from 'src/components/snackbar';

import { Iconify } from 'src/components/iconify';
import { fDate } from 'src/utils/format-time';
import { FormatCurrencyRupiah } from 'src/utils/currency-format';
import { Label } from 'src/components/label';
import { Box, Button } from '@mui/material';
import { CONFIG } from 'src/config-global';
import TableProductDetail from './TableProductDetail';
import { TeethDisplay } from 'src/sections/project/stepperProject/teeth-display';

// ----------------------------------------------------------------------

export function ProjectDetailContent({
  project,
  handleDownloadFiles,
  isShowButtonTakeProject = false,
}) {
  let statusColor = 'warning';
  if (project.projectContent) {
    if (project.projectContent.status === 'Completed') {
      statusColor = 'success';
    } else if (project.projectContent.status === 'On Progress') {
      statusColor = 'secondary';
    } else if (project.projectContent.status === 'Pending') {
      statusColor = 'warning';
    } else if (project.projectContent.status === 'Closed') {
      statusColor = 'error';
    }
  }

  console.log('detail project', project);

  const modelTypes = ['.stl', '.glb'];
  console.log(project);

  const handleTakeProject = () => {
    toast.success('Success take project !');
  };

  const renderContent = (
    <Card sx={{ p: 3, gap: 3, display: 'flex', flexDirection: 'column' }}>
      <Box>
        <Label variant="soft" color={statusColor}>
          {project.projectContent && project.projectContent.status}
        </Label>
      </Box>
      <Typography variant="h4">{project.projectContent && project.projectContent.title}</Typography>

      <Typography textAlign={'justify'}>
        {project.projectContent && project.projectContent.description}
      </Typography>

      <Stack spacing={2}>
        <Typography variant="h6">Client Detail</Typography>
        <Typography>{project.projectContent && project.projectContent.client_name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {project.projectContent && project.projectContent.client_email}
        </Typography>
      </Stack>
      <Stack spacing={2}>
        <Typography variant="h6">Pasien Detail</Typography>
        <Typography>{project.projectContent && project.projectContent.patient_name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {project.projectContent && project.projectContent.patient_nohp}
        </Typography>
      </Stack>
      <Stack spacing={2}>
        <Typography variant="h6">Product Detail</Typography>
        <TeethDisplay selected={project.projectProducts} onSelect={null} />
        <TableProductDetail products={project.projectProducts} />
      </Stack>

      <Stack spacing={2}>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography variant="h6">Files</Typography>
          <Button
            onClick={handleDownloadFiles}
            color="inherit"
            size="small"
            variant="contained"
            startIcon={<Iconify icon="solar:download-square-bold" />}
          >
            Download
          </Button>
        </Stack>
        {project.loadingFiles ? (
          <Typography>loading....</Typography>
        ) : (
          <Stack direction="row" alignItems="center" spacing={1} flexWrap={'wrap'}>
            {project.projectFiles &&
              project.projectFiles.map((file, index) => (
                <Box
                  key={index}
                  sx={{
                    position: 'relative',
                    width: '60px',
                    height: '60px',
                    minWidth: '60px',
                    border: '1px solid rgb(211, 211, 211)',
                    borderRadius: '6px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {modelTypes.includes(file.file_type) ? (
                    file.file_type
                  ) : (
                    <Image
                      src={`${CONFIG.BASE_API_URL}/images${file.file_path}`}
                      alt="thumbnail"
                      objectFit="cover"
                      style={{ borderRadius: '6px' }}
                      quality={100}
                      width={60}
                      height={60}
                    />
                  )}
                </Box>
              ))}
          </Stack>
        )}
      </Stack>
    </Card>
  );

  const renderOverview = (
    <Card sx={{ p: 3, gap: 2, display: 'flex', flexDirection: 'column' }}>
      {[
        {
          label: 'Date posted',
          value:
            project.projectContent && project.projectContent.created_at
              ? fDate(project.projectContent.created_at)
              : '-',
          icon: <Iconify icon="solar:calendar-date-bold" />,
        },
        {
          label: 'Date started',
          value:
            project.projectContent && project.projectContent.start_project_date
              ? fDate(project.projectContent.start_project_date)
              : '-',
          icon: <Iconify icon="solar:calendar-date-bold" />,
        },
        {
          label: 'Date end',
          value:
            project.projectContent && project.projectContent.end_project_date
              ? fDate(project.projectContent.end_project_date)
              : '-',
          icon: <Iconify icon="solar:calendar-date-bold" />,
        },
        {
          label: 'Budget',
          value: FormatCurrencyRupiah.format(
            project.projectContent && project.projectContent.budget
          ),
          icon: <Iconify icon="solar:wad-of-money-bold" />,
        },
      ].map((item) => (
        <Stack key={item.label} spacing={1.5} direction="row">
          {item.icon}
          <ListItemText
            primary={item.label}
            secondary={item.value}
            primaryTypographyProps={{ typography: 'body2', color: 'text.secondary', mb: 0.5 }}
            secondaryTypographyProps={{
              component: 'span',
              color: 'text.primary',
              typography: 'subtitle2',
            }}
          />
        </Stack>
      ))}
    </Card>
  );
  const renderWorker = (
    <Card sx={{ p: 3, gap: 2, display: 'flex', flexDirection: 'column', mt: 3 }}>
      {[
        {
          label: 'Worker Name',
          value:
            project.projectContent && project.projectContent.worker_name
              ? project.projectContent.worker_name
              : '-',
          icon: <Iconify icon="solar:user-circle-bold" />,
        },
        {
          label: 'Worker Email',
          value:
            project.projectContent && project.projectContent.worker_email
              ? project.projectContent.worker_email
              : '-',
          icon: <Iconify icon="solar:case-minimalistic-bold" />,
        },
      ].map((item) => (
        <Stack key={item.label} spacing={1.5} direction="row">
          {item.icon}
          <ListItemText
            primary={item.label}
            secondary={item.value}
            primaryTypographyProps={{ typography: 'body2', color: 'text.secondary', mb: 0.5 }}
            secondaryTypographyProps={{
              component: 'span',
              color: 'text.primary',
              typography: 'subtitle2',
            }}
          />
        </Stack>
      ))}
    </Card>
  );

  const renderButtonTakeProject = (
    <Box sx={{ mt: 3 }}>
      <Button
        onClick={handleTakeProject}
        variant="contained"
        color="primary"
        fullWidth
        size="large"
      >
        Take Project
      </Button>
    </Box>
  );

  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={8}>
        {renderContent}
      </Grid>

      <Grid xs={12} md={4}>
        {renderOverview}
        {renderWorker}
        {isShowButtonTakeProject && renderButtonTakeProject}
      </Grid>
    </Grid>
  );
}
