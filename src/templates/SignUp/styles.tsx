import { styled, Theme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { Colors } from 'styles/theme/colors';

export const PictureHeader = styled(Typography)(({ theme }) => ({
  padding: '0.4rem',
  flexGrow: 1,
  fontSize: '5rem',
  fontFamily: '"Lora"',
  color: Colors.white,
  position: 'absolute',
  top: '10%',
  zIndex: 10,
  [theme.breakpoints.up('md')]: {
    fontSize: '4.5rem',
    top: '2%'
  },

  [theme.breakpoints.down('md')]: {
    fontSize: '3rem',
    top: '3%'
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.8rem',
    top: '5%'
  }
}));

// had to use negative margin on the right, because mui5 layout on small devices
// add a margin on the right 🤔
export const ImageContainer = styled(Box)(({ theme }) => ({
  backgroundColor: Colors.primary,
  [theme.breakpoints.down('sm')]: {
    marginRight: '-2.7rem'
  }
}));

export const FormContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    marginRight: '-2.6rem'
  }
}));
