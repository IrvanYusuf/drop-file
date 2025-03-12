import { Divider } from '@mui/material';
import { varAlpha } from 'src/theme/styles';

const VerticalDivider = () => {
  return (
    <Divider
      component="div"
      orientation="vertical"
      flexItem
      sx={{
        width: '1px',
        opacity: 0.16,
        border: 'none',
        background: (theme) =>
          `linear-gradient(to bottom, ${varAlpha(
            theme.vars.palette.grey['500Channel'],
            0
          )} 0%, ${theme.vars.palette.grey[500]} 50%, ${varAlpha(
            theme.vars.palette.grey['500Channel'],
            0
          )} 100%)`,
        display: { xs: 'none', md: 'block' },
      }}
    />
  );
};

export default VerticalDivider;
