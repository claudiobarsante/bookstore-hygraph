import { IconButton, List, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import '@fontsource/montez';
import { Colors } from 'styles/theme/colors';
import { DRAWER_WIDTH } from 'styles/theme';

export const AppbarContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '1rem',
  padding: '0.2rem 0.8rem'
}));

export const AppbarHeader = styled(Typography)(() => ({
  padding: '0.4rem',
  flexGrow: 1,
  fontSize: '4rem',
  fontFamily: '"Montez", "cursive"',
  color: Colors.primary,
  '&:hover': {
    cursor: 'pointer'
  }
}));

export const ActionIconsContainerMobile = styled(Box)(() => ({
  display: 'flex',
  background: Colors.shaft,
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  alignItems: 'center',
  zIndex: 99,
  borderTop: `1px solid ${Colors.border}`
}));

export const ActionIconsContainerDesktop = styled(Box)(() => ({
  flexGrow: 0
}));

type TopMenuProps = {
  type: 'row' | 'column';
};

export const TopMenu = styled(List)(({ type }: TopMenuProps) => ({
  display: type === 'row' ? 'flex' : 'block',
  justifyContent: 'center',
  alignItems: 'center',

  flexGrow: 3
}));

export const DrawerCloseButton = styled(IconButton)(() => ({
  position: 'absolute',
  top: 10,
  left: DRAWER_WIDTH,
  zIndex: 1999
}));
