import { useCallback, useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import Link from 'next/link';
// -- Authentication
import { signIn } from 'next-auth/react';
// -- Material ui
import { Box, Typography, Alert } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
// -- Graphql
import {
  SignupMutation,
  SignupMutationVariables
} from 'graphql/generated/graphql';
import { SIGNUP_MUTATION } from 'graphql/mutations/user';
// -- Custom components
import CustomTitle from 'components/Title';
import FormHeader from 'components/FormHeader';
import PasswordInput from 'components/Inputs/Password';
import StandardInput from 'components/Inputs/Standard';
// -- Custom validations
import {
  FieldErrors,
  FormFields,
  signUpValidate,
  validateField
} from 'utils/validations';
// -- Utils
import { encryptPassword } from 'utils/password';

export type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
};

export type ApolloErrorResult = {
  errors: { message: string }[];
  data: null;
  extensions: { requestId: string };
};

const FormSignUp = () => {
  const [values, setValues] = useState<FormValues>({
    email: '',
    password: '',
    confirmPassword: '',
    username: ''
  });
  const [fieldError, setFieldError] = useState<FieldErrors>({} as FieldErrors);
  const [submitError, setSubmitError] = useState('');

  //#region Create User
  const [createUser, { loading: loadingCreateUser }] = useMutation<
    SignupMutation,
    SignupMutationVariables
  >(SIGNUP_MUTATION, {
    onCompleted: () => {
      signIn('credentials', {
        email: values.email,
        password: values.password,
        callbackUrl: '/'
      });
    },
    onError: (apolloError) => {
      // -- Getting the network --
      const error: ApolloError = new ApolloError(apolloError);
      const networkError = error.networkError as unknown as {
        result: ApolloErrorResult;
      };

      let errorMessage = '';
      if (networkError?.result)
        errorMessage = networkError.result.errors[0].message;
      // -- to show error from mocked tests --
      if (!networkError?.result)
        errorMessage = apolloError.networkError?.message as string;
      // --------------------------------------
      if (errorMessage === 'value is not unique for the field "email"') {
        setSubmitError(
          `The e-mail ${values.email} is already taken, try another one.`
        );
      }
    }
  });
  //#endregion
  const handleOnChange = (
    field: keyof FormValues,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [field]: event.target.value });
  };

  const handleOnSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { email, password, username, confirmPassword } = values;
    setFieldError({} as FieldErrors);
    const errors = signUpValidate({
      email,
      password,
      username,
      confirmPassword
    });

    if (Object.keys(errors).length) {
      setFieldError(errors);
      return;
    }

    createUser({
      variables: { username, email, password: await encryptPassword(password) }
    });
    // createUser({
    //   variables: { username, email, password }
    // });
  };

  const handleOnBlur = useCallback(
    (field: keyof FormFields) => {
      const errorCheck = validateField(field, values[field]) as FieldErrors;

      //? cleaning previous error
      const hasPreviousError =
        fieldError.hasOwnProperty(field) && !errorCheck.hasOwnProperty(field);
      if (hasPreviousError) {
        setFieldError((previous) => {
          // Using the object restructuring and rest syntax, we can destructure the object with the property to be removed and create a new copy of it.
          // After the destructuring, a new copy of the object gets created and assigned to a new variable without the property that we chose to remove.
          // Assign to the [field] regex _ indicating that the [field] it will be not included
          const { [field]: _, ...updatedErrors } = previous;
          return updatedErrors as FieldErrors;
        });
      }

      if (errorCheck.hasOwnProperty(field)) {
        setFieldError((previous) => ({
          ...previous,
          [field]: errorCheck[field]
        }));
      }
    },
    [fieldError, values]
  );

  return (
    <form onSubmit={handleOnSubmit}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '25rem',
          position: 'relative'
        }}
      >
        <CustomTitle
          color="primary"
          href="/"
          size="medium"
          sx={{ marginBottom: '2rem' }}
          text="Book  Store"
        />
        <Box
          sx={{
            marginTop: '2rem',
            marginBottom: '-3rem',
            visibility: !!submitError ? 'visible' : 'hidden'
          }}
        >
          <Alert severity="error">{submitError}</Alert>
        </Box>
        <FormHeader
          text="Sign Up"
          color="primary"
          sx={{
            paddingLeft: '0.5rem',
            position: 'absolute',
            top: '8.5rem',
            left: 0
          }}
        />
        <StandardInput
          color="primary"
          field="username"
          fieldError={fieldError}
          handleOnBlur={handleOnBlur}
          handleOnChange={handleOnChange}
          label="User name"
          values={values}
          sx={{ marginBottom: '2rem', marginTop: '4rem' }}
        />

        <StandardInput
          color="primary"
          field="email"
          fieldError={fieldError}
          handleOnBlur={handleOnBlur}
          handleOnChange={handleOnChange}
          label="E-mail"
          values={values}
          sx={{ marginBottom: '2rem' }}
        />

        <PasswordInput
          color="primary"
          field="password"
          fieldError={fieldError}
          handleOnBlur={handleOnBlur}
          handleOnChange={handleOnChange}
          label="Password"
          values={values}
          sx={{ marginBottom: 3 }}
        />
        <PasswordInput
          color="primary"
          field="confirmPassword"
          fieldError={fieldError}
          handleOnBlur={handleOnBlur}
          handleOnChange={handleOnChange}
          label="Confirm password"
          values={values}
        />

        <LoadingButton
          loading={loadingCreateUser}
          aria-label="sign up"
          type="submit"
          variant="contained"
          sx={{
            color: 'white',
            height: '3.4rem',
            width: '100%',
            marginTop: '10%',
            marginBottom: '3%'
          }}
        >
          Sign up now
        </LoadingButton>
        <Typography variant="subtitle2" gutterBottom>
          Already hava an account?{'  '}
          <Link href="/sign-in">
            <a>Sign In</a>
          </Link>
        </Typography>
      </Box>
    </form>
  );
};

export default FormSignUp;
