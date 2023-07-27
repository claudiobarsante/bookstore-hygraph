import React from 'react';
import Link from 'next/link';
//import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import * as S from './styles';

import { useRouter } from 'next/router';
import { ListItemText } from '@mui/material';
type Props = {
  text: string;
  href: string;
};

const TopMenuLink = ({ text, href }: Props) => {
  const router = useRouter();

  //todo: fix to show correct active page
  const isActive = router.asPath === href;

  return (
    <Link href={`${href}`}>
      <S.LinkContainer>
        <a>{text}</a>
        {/* <ListItemText primary={text} sx={{ border: '1px solid black' }} /> */}
        {isActive && <BookmarkIcon />}
      </S.LinkContainer>
    </Link>
  );
};

export default TopMenuLink;
