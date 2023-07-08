import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { darken } from 'polished';
// -- Material ui
import { Alert, Box, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
// -- Validations  and types
import {
  FieldErrors,
  FormFields,
  signInValidate,
  validateField
} from 'utils/validations';
// -- Custom components
import { FormValues } from 'components/FormSignUp';
import CustomTitle from 'components/Title';
import FormHeader from 'components/FormHeader';
import PasswordInput from 'components/Inputs/Password';
import StandardInput from 'components/Inputs/Standard';
// -- Styles
import { Colors } from 'styles/theme/colors';

const FormSignIn = () => {
  const initialFormValues = {
    email: '',
    password: '',
    confirmPassword: '',
    username: ''
  };

  const [fieldError, setFieldError] = useState<FieldErrors>({} as FieldErrors);
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<FormValues>(initialFormValues);

  const router = useRouter();
  const { push, query } = router;

  const handleOnChange = (
    field: keyof FormValues,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [field]: event.target.value });
  };

  const handleOnSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);

    const errors = signInValidate({
      email: values.email,
      password: values.password
    });

    if (Object.keys(errors).length) {
      setFieldError(errors);
      setLoading(false);
      return;
    }

    setFieldError({} as FieldErrors);

    // sign in
    const result = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: `${window.location.origin}${query?.callbackUrl || ''}`
    });

    if (result?.url) {
      return push(result?.url);
    }

    setLoading(false);
    // jogar o erro
    setFormError('username or password is invalid');
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
    <>
      <form onSubmit={handleOnSubmit}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <CustomTitle
            color="lightBlue"
            href="/"
            size="medium"
            sx={{ marginBottom: '2rem' }}
            text="Book  Store"
          />

          <FormHeader
            text="Sign In"
            color="lightBlue"
            sx={{
              paddingLeft: '0.5rem'
            }}
          />

          <Box
            sx={{
              marginTop: '2rem',
              marginBottom: '-3rem',
              visibility: !!formError ? 'visible' : 'hidden'
            }}
          >
            <Alert severity="error">{formError}</Alert>
          </Box>

          <StandardInput
            color="lightBlue"
            field="email"
            fieldError={fieldError}
            handleOnBlur={handleOnBlur}
            handleOnChange={handleOnChange}
            label="E-mail"
            values={values}
            sx={{
              marginBottom: '2rem',
              marginTop: '4rem'
            }}
          />

          <PasswordInput
            color="lightBlue"
            field="password"
            fieldError={fieldError}
            handleOnBlur={handleOnBlur}
            handleOnChange={handleOnChange}
            values={values}
            sx={{ marginBottom: 3 }}
          />

          <LoadingButton
            data-testid="submit-button"
            loading={loading}
            aria-label="sign in"
            type="submit"
            variant="contained"
            sx={{
              color: 'white',
              height: '3.4rem',
              width: '100%',
              marginTop: '10%',
              marginBottom: '3%',
              backgroundColor: Colors.lightBlue,
              '&:hover': {
                backgroundColor: darken(0.1, Colors.lightBlue)
              }
            }}
          >
            Sign in
          </LoadingButton>
          <Typography variant="subtitle2" gutterBottom>
            Forgot your password?{'  '}
            <Link href="/">
              <a>Remember me</a>
            </Link>
          </Typography>
        </Box>
      </form>
    </>
  );
};

export default FormSignIn;
