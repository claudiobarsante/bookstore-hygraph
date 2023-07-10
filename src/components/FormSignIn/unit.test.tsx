import userEvent from '@testing-library/user-event';
import { signIn } from 'next-auth/react';
import { mocked } from 'jest-mock';
import {
  renderWithTheme,
  screen,
  fireEvent,
  act,
  waitFor
} from 'utils/tests/helpers';

import FormSignIn from '.';

jest.mock('components/Title', () => ({
  __esModule: true,
  default: function Mock() {
    return <div data-testid="Mock Title" />;
  }
}));

jest.mock('components/FormHeader', () => ({
  __esModule: true,
  default: function Mock() {
    return <div data-testid="Mock FormHeader" />;
  }
}));

const useRouter = jest.spyOn(require('next/router'), 'useRouter');
const push = jest.fn();

useRouter.mockImplementation(() => ({
  prefetch: jest.fn().mockResolvedValue(undefined),
  push,
  query: '',
  asPath: '',
  route: '/'
}));

jest.mock('next-auth/react', () => ({
  signIn: jest.fn()
}));

describe('<FormSignIn />', () => {
  it('should render the form', () => {
    renderWithTheme(<FormSignIn />);

    expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /sign in/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/forgot your password\?/i)).toBeInTheDocument();
    //expect(screen.getByText(/remember me/i)).toBeInTheDocument();
    expect(
      screen.getByRole('link', {
        name: /remember me/i
      })
    ).toBeInTheDocument();
  });

  it('should show error message for an invalid email', async () => {
    const errorMessage = '"email" must be a valid email';
    renderWithTheme(<FormSignIn />);

    const emailInput = screen.getByLabelText('E-mail');
    userEvent.type(emailInput, 'invalid-e-mail-format');

    await waitFor(() => {
      expect(emailInput).toHaveValue('invalid-e-mail-format');
    });
    userEvent.tab();

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('should show error message when password is empty or less than 6 characters', async () => {
    renderWithTheme(<FormSignIn />);

    const passwordInput = screen.getByLabelText('Password');
    // -- Empty password --
    userEvent.clear(passwordInput);

    await waitFor(() => {
      expect(passwordInput).toHaveValue('');
    });

    userEvent.tab();

    await waitFor(() => {
      expect(
        screen.getByText('"password" is not allowed to be empty')
      ).toBeInTheDocument();
    });

    // -- Less than 6 characters --
    userEvent.type(passwordInput, '123');

    await waitFor(() => {
      expect(passwordInput).toHaveValue('123');
    });

    userEvent.tab();

    await waitFor(() => {
      expect(
        screen.getByText('"password" length must be at least 6 characters long')
      ).toBeInTheDocument();
    });
  });

  it('should submit the form', async () => {
    renderWithTheme(<FormSignIn />);

    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText('Password');
    // const button = screen.getByRole('button', { name: /sign in/i });

    // Fill in form fields
    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    const submitButton = screen.getByRole('button', { name: /sign in/i });
    // Submit form
    // fireEvent.click(submitButton);
    submitButton.click();
    // Assert that the LoadingButton was clicked and the form was submitted
    expect(signIn).toHaveBeenCalledWith('credentials', {
      email: 'user@example.com',
      password: 'password123',
      callbackUrl: 'http://localhost',
      redirect: false
    });
  });

  it('should show error message for an invalid user or password', async () => {
    const mockedSignIn = mocked(signIn);
    mockedSignIn.mockResolvedValueOnce({
      error: 'CredentialsSignin',
      status: 401,
      ok: false,
      url: null
    });

    renderWithTheme(<FormSignIn />);

    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText('Password');
    // const button = screen.getByRole('button', { name: /sign in/i });

    // Fill in form fields
    fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    const submitButton = screen.getByRole('button', { name: /sign in/i });
    // Submit form
    // fireEvent.click(submitButton);
    submitButton.click();
    // Assert that the error message is displayed
    const errorMessage = await screen.findByText(
      'username or password is invalid'
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
