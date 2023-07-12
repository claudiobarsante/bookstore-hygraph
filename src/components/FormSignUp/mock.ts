import { SIGNUP_MUTATION } from 'graphql/mutations/user';

//?To simulate a network error, you can include an error field in your test's mock object */
export const emailAlreadyTakenMock = {
  request: {
    query: SIGNUP_MUTATION,
    variables: {
      username: 'John Doe',
      email: 'alreadyexists@example.com',
      password: '123456'
    }
  },
  error: new Error('value is not unique for the field "email"') //network error
};
