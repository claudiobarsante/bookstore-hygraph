import { Box, Typography } from '@mui/material';
import { Colors } from 'styles/theme/colors';
import { SxProps, Theme } from '@mui/material/styles';

type Props = {
  text: string;
  color: keyof typeof Colors; //⚡When the type of the object is not known --> const temp = someObj[field as keyof typeof someObj]
  sx?: SxProps<Theme>;
};
const FormHeader = ({ text, color, sx: sxAdded }: Props) => {
  const merged = {
    ...{
      borderLeft: `0.4rem solid ${Colors[color]}`
    },
    ...sxAdded
  };

  return (
    <Box sx={merged}>
      <Typography sx={{ fontWeight: '500' }} variant="h5">
        {text}
      </Typography>
    </Box>
  );
};

export default FormHeader;
