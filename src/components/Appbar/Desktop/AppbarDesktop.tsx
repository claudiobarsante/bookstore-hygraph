import Link from 'next/link';

// -- Types
import { AppbarProps } from '../types';
// -- Styles
import * as S from '../styles';
// -- Icons

import Actions from '../Actions';
import TopMenuLink from './TopMenuLink';

export default function AppbarDesktop({ isMobile, userStatus }: AppbarProps) {
  return (
    <S.AppbarContainer>
      <Link href="/" passHref>
        <S.AppbarHeader>Book store</S.AppbarHeader>
      </Link>
      <S.TopMenu type="row">
        <TopMenuLink text="Home" href="/" />
        <TopMenuLink text="Books" href="/books" />
        <TopMenuLink text="About" href="/about" />
        <TopMenuLink text="Contact us" href="/contact" />
      </S.TopMenu>
      <Actions isMobile={isMobile} userStatus={userStatus} />
    </S.AppbarContainer>
  );
}
