import { styled, Theme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { Colors } from 'styles/theme/colors';

export const PictureHeader = styled(Typography)(({ theme }) => ({
  color: Colors.white,
  fontFamily: 'Lora',
  left: '50%',
  overflow: 'hidden',
  position: 'absolute',
  top: '5%',
  transform: 'translateX(-50%)',
  whiteSpace: 'nowrap',
  zIndex: 10,

  [theme.breakpoints.up('md')]: {
    fontSize: '3.0rem'
  },

  [theme.breakpoints.down('md')]: {
    fontSize: '2rem'
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.4rem'
  }
}));
