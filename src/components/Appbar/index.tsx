import { useSession } from 'next-auth/react';
import useIsMobile from 'hooks/use-IsMobile';
import AppbarDesktop from './Desktop/AppbarDesktop';
import AppbarMobile from './AppbarMobile';

export default function Appbar() {
  const isMobile = useIsMobile();
  const { data: session, status } = useSession();

  return (
    <>
      {isMobile ? (
        <AppbarMobile isMobile={isMobile} userStatus={status} />
      ) : (
        <AppbarDesktop isMobile={isMobile} userStatus={status} />
      )}
    </>
  );
}
