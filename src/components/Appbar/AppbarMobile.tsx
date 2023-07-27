// -- Material icons
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import { useUIContext } from 'context/ui';
//import { useUIContext } from "../../context/ui";
// -- Custom components
import Actions from './Actions';
// --Styles
import * as S from './styles';
// -- Types
import { AppbarProps } from './types';

export default function AppbarMobile({ isMobile, userStatus }: AppbarProps) {
  const { setDrawerOpen, setShowSearchBox } = useUIContext();
  return (
    <S.AppbarContainer>
      <IconButton onClick={() => setDrawerOpen(true)}>
        <MenuIcon />
      </IconButton>
      <S.AppbarHeader textAlign={'center'} variant="h4">
        My Bags
      </S.AppbarHeader>
      <IconButton onClick={() => setShowSearchBox(true)}>
        <SearchIcon />
      </IconButton>
      <Actions isMobile={isMobile} userStatus={userStatus} />
    </S.AppbarContainer>
  );
}
