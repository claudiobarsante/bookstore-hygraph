import { gql } from '@apollo/client';

export const SIGNUP_MUTATION = gql`
  mutation Signup($username: String!, $password: String!, $email: String!) {
    createApiUser(
      data: { username: $username, password: $password, email: $email }
    ) {
      id
      username
      email
      password
    }
  }
`;
