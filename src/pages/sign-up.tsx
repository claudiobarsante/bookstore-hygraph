import { FormEvent, useState, useEffect } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { encryptPassword } from 'utils/password';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const SIGNUP_MUTATION = gql`
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
  const USERS_QUERY = gql`
    query Users {
      apiUsers(stage: DRAFT) {
        id
        username
        email
        password
      }
    }
  `;
  const { error: err, data: dt } = useQuery(USERS_QUERY);
  console.log('----', err, dt);

  const [createUser, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => console.log('eroorr', error)
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    createUser({
      variables: { username, password: encryptPassword(password), email }
    });
  }

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <input
        type="text"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
