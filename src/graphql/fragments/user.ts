import { gql } from '@apollo/client';

export const UserFragment = gql`
  fragment UserFragment on ApiUser {
    id
    username
    email
    password
  }
`;
