import { Typography } from '@mui/material';
import '@fontsource/lora';
import { styled } from '@mui/material/styles';

type Props = {
  fontSize: string;
  color: string;
};
export const Title = styled(Typography)(({ fontSize, color }: Props) => ({
  padding: '0.4rem',
  flexGrow: 1,
  fontSize: fontSize,
  color: color,
  textAlign: 'center',

  fontFamily: 'Lora',
  '&:hover': {
    cursor: 'pointer'
  }
}));
