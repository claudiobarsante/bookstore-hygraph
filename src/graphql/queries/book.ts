import { gql } from '@apollo/client';

export const BookFragment = gql`
  fragment BookFragment on Book {
    id
    title
    isbn
    coverImageUrl
    isOnSale
    pageCount
    price
    salePrice
    synopsis
    stock
    rating
    ratingCount
    ratings
    author {
      name
    }
    publisher {
      name
    }
    category {
      name
    }
  }
`;

export const FEATURED_QUERY = gql`
  query Featured {
    books(where: { isFeatured: true }) {
      ...BookFragment
    }
  }
  ${BookFragment}
`;
