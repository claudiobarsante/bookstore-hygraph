import type { AppProps as NextAppProps } from 'next/app';
// -- Apollo
import { ApolloProvider } from '@apollo/client';
import { useApollo } from 'graphql/client/apolloClient';
// -- Material UI
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from 'utils/emotion/createEmotionCache';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from 'styles/theme';
// -- NextNprogress --
import NextNprogress from 'nextjs-progressbar';
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

type AppProps<P = any> = {
  pageProps: P;
  emotionCache?: EmotionCache;
} & Omit<NextAppProps<P>, 'pageProps'>;

export default function App(props: AppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const apolloClient = useApollo(pageProps);
  return (
    <ApolloProvider client={apolloClient}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <NextNprogress
            color="#73bd73"
            startPosition={0.3}
            stopDelayMs={200}
            showOnShallow={true}
          />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </ApolloProvider>
  );
}
