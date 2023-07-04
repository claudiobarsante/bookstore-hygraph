import type { AppProps } from 'next/app';
// -- Apollo
import { ApolloProvider } from '@apollo/client';
import { useApollo } from 'graphql/client/apolloClient';

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
