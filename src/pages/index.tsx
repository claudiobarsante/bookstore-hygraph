import type { GetStaticProps } from 'next';
// --  Apollo
import { initializeApollo } from 'graphql/client/apolloClient';
import { FEATURED_QUERY } from 'graphql/queries/book';
import { FeaturedQuery } from 'graphql/generated/graphql';
// -- Type
import { BooksProps } from 'components/Books';
// -- Template
import HomeTemplate from 'templates/Home';

const Home = ({ books }: BooksProps) => {
  return <HomeTemplate books={books} />;
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();
  const { data, error } = await apolloClient.query<FeaturedQuery>({
    query: FEATURED_QUERY,
    fetchPolicy: 'no-cache'
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      books: data.books
    }
  };
};
