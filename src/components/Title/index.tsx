import Link from 'next/link';
import { SxProps, Theme } from '@mui/material/styles';
// -- Styles
import { Colors } from 'styles/theme/colors';
import * as S from './styles';

type Props = {
  color: keyof typeof Colors;
  href: string;
  size?: 'small' | 'medium' | 'large';
  sx?: SxProps<Theme>;
  text: string;
};

const sizes = {
  small: '2rem',
  medium: '4rem',
  large: '6rem'
};

const CustomTitle = ({ color, href, size = 'medium', sx, text }: Props) => {
  return (
    <Link href={href} passHref>
      <S.Title fontSize={sizes[size]} color={Colors[color]} sx={sx}>
        {text}
      </S.Title>
    </Link>
  );
};

export default CustomTitle;
