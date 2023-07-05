import { Box, Container, Grid, Typography } from '@mui/material';
import FormSignUp from 'components/FormSignUp';
import Image from 'next/image';
import { Colors } from 'styles/theme/colors';
const image = '/img/4807-G.jpg';
import * as S from './styles';

const SignUpTemplate = () => {
  return (
    <Grid container height="100vh" width="100vw">
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.primary,
          position: 'relative'
        }}
      >
        <S.PictureHeader>All your favorite books in one place</S.PictureHeader>
        <S.ImageContainer>
          <Image
            src={image}
            alt="People reading books"
            height={700}
            width={900}
            aria-label="People reading books"
          />
        </S.ImageContainer>
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
        <S.FormContainer>
          <FormSignUp />
        </S.FormContainer>
      </Grid>
    </Grid>
  );
};

export default SignUpTemplate;
