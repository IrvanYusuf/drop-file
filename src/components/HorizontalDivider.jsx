import { Divider } from '@mui/material';
import { varAlpha } from 'src/theme/styles';

const HorizontalDivider = ({ position }) => {
  return (
    <Divider
      component="div"
      sx={{
        width: 1,
        opacity: 0.16,
        height: '1px',
        border: 'none',
        position: 'absolute',
        background: (theme) =>
          `linear-gradient(to right, ${varAlpha(
            theme.vars.palette.grey['500Channel'],
            0
          )} 0%, ${theme.vars.palette.grey[500]} 50%, ${varAlpha(
            theme.vars.palette.grey['500Channel'],
            0
          )} 100%)`,
        ...(position === 'top' && { top: 0 }),
        ...(position === 'bottom' && { bottom: 0 }),
      }}
    />
  );
};

export default HorizontalDivider;
