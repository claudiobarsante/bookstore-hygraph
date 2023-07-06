import Image from 'next/image';
import { Grid, Box, Typography } from '@mui/material';
// -- Custom components
import FormSignIn from 'components/FormSignIn';
// -- Theme
import { Colors } from 'styles/theme/colors';
import * as S from './styles';
// -- Images
import image from '/public/img/5281-LB.jpg';

const SignInTemplate = () => {
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundColor: Colors.lightBlue,
          position: 'relative',
          height: '100vh'
        }}
      >
        <S.PictureHeader>Your companion anywhere</S.PictureHeader>
        <Image
          src={image}
          alt="People reading books in the subway"
          aria-label="People reading books in the subway"
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '6%'
        }}
      >
        <FormSignIn />
      </Grid>
    </Grid>
  );
};

export default SignInTemplate;
