import { gql } from '@apollo/client';
import { UserFragment } from './../fragments/user';

export const SIGNUP_MUTATION = gql`
  mutation Signup($username: String!, $password: String!, $email: String!) {
    createApiUser(
      data: { username: $username, password: $password, email: $email }
    ) {
      ...UserFragment
    }
  }
  ${UserFragment}
`;
