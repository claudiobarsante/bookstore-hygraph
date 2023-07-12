import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import {
  renderWithTheme,
  screen,
  fireEvent,
  act,
  waitFor
} from 'utils/tests/helpers';

import FormSignUp, { ApolloErrorResult } from '.';
import { emailAlreadyTakenMock } from './mock';
import { ApolloError } from '@apollo/client';

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

describe('<FormSignUp />', () => {
  it('should render the form', () => {
    renderWithTheme(
      <MockedProvider mocks={[]} addTypename={false}>
        <FormSignUp />
      </MockedProvider>
    );
    expect(screen.getByLabelText('User name')).toBeInTheDocument();
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm password')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /sign up/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument();
  });
});

describe('Error messages', () => {
  it('should show error messages for an empty or invalid user name', async () => {
    renderWithTheme(
      <MockedProvider mocks={[]} addTypename={false}>
        <FormSignUp />
      </MockedProvider>
    );
    const usernameInput = screen.getByLabelText('User name');
    userEvent.clear(usernameInput);
    // -- Empty username --
    await waitFor(() => {
      expect(usernameInput).toHaveValue('');
    });

    userEvent.tab();

    await waitFor(() => {
      expect(
        screen.getByText('"username" is not allowed to be empty')
      ).toBeInTheDocument();
    });
    // -- Less than 5 characters --
    userEvent.type(usernameInput, 'abcd');

    await waitFor(() => {
      expect(usernameInput).toHaveValue('abcd');
    });

    userEvent.tab();
    await waitFor(() => {
      expect(
        screen.getByText(
          /"username" length must be at least 5 characters long/i
        )
      ).toBeInTheDocument();
    });
  });
  //? -- It's not possible to test the e-mail validation here, because there's no way I cam mock
  //? -- the encryption of the password to use to mock the  SIGNUP_MUTATION
  it.skip('should show error message when the e-mail is already taken', async () => {
    renderWithTheme(
      <MockedProvider mocks={[emailAlreadyTakenMock]} addTypename={false}>
        <FormSignUp />
      </MockedProvider>
    );
    const usernameInput = screen.getByLabelText('User name');
    userEvent.type(usernameInput, 'John Doe');
    await waitFor(() => {
      expect(usernameInput).toHaveValue('John Doe');
    });

    userEvent.tab();

    const emailInput = screen.getByLabelText('E-mail');
    userEvent.type(emailInput, 'alreadyexists@example.com');
    await waitFor(() => {
      expect(emailInput).toHaveValue('alreadyexists@example.com');
    });

    userEvent.tab();

    const passwordInput = screen.getByLabelText('Password');
    userEvent.type(passwordInput, '123456');
    await waitFor(() => {
      expect(passwordInput).toHaveValue('123456');
    });

    userEvent.tab();

    const confirmPasswordInput = screen.getByLabelText('Confirm password');
    userEvent.type(confirmPasswordInput, '123456');
    await waitFor(() => {
      expect(confirmPasswordInput).toHaveValue('123456');
    });

    userEvent.tab();

    const button = screen.getByRole('button', { name: /sign up/i });
    button.click();

    await waitFor(() => {
      expect(
        screen.getByText(
          /the e\-mail alreadyexists@example\.com is already taken, try another one\./i
        )
      ).toBeInTheDocument();
    });
  });
});
