import { Box, Button, Typography } from '@mui/material';
import { styled, Theme } from '@mui/material/styles';
import { Colors } from 'styles/theme/colors';

export const LinkContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  cursor: 'pointer',

  svg: {
    color: Colors.primary
  }
}));
