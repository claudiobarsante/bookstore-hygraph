import { gql } from '@apollo/client';
import { UserFragment } from './../fragments/user';

export const USER_QUERY = gql`
  query User($email: String) {
    apiUser(where: { email: $email }, stage: DRAFT) {
      ...UserFragment
    }
  }
  ${UserFragment}
`;
