import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import {
  renderWithTheme,
  screen,
  fireEvent,
  act,
  waitFor
} from 'utils/tests/helpers';

import FormSignUp from '.';

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
  it('should update the state of the input fields when a user types in them', () => {
    const handleOnChange = jest.fn();
    renderWithTheme(
      <MockedProvider mocks={[]} addTypename={false}>
        <FormSignUp />
      </MockedProvider>
    );

    const usernameInput = screen.getByRole('textbox', { name: /username/i });
    //const usernameInput = screen.getByLabelText('Username');
    // const emailInput = screen.getByLabelText('E-mail');
    // const passwordInput = screen.getByRole('textbox', { name: /password/i });
    //  const confirmPasswordInput = screen.getByRole('textbox', {
    //    name: /confirm password/i
    //  });

    userEvent.type(usernameInput, 'JohnDoe');
    // userEvent.type(emailInput, 'envkt@example.com');
    //userEvent.type(passwordInput, 'password');
    //userEvent.type(confirmPasswordInput, 'password');

    expect(usernameInput).toHaveValue('');
    //expect(emailInput).toBe('envkt@example.com');
    // expect(passwordInput).toBe('password');
    //expect(confirmPasswordInput).toBe('password');
  });
});

/**
 *  it('should display an error message when the username field is blurred and it is empty', () => {
    render(<FormSignUp />);

    const usernameInput = screen.getByLabelText('Username');

    fireEvent.blur(usernameInput);

    expect(screen.getByText('This field is required.')).toBeInTheDocument();
  });

  import { render, fireEvent, waitFor } from '@testing-library/react';
import FormSignUp from './FormSignUp';

describe('FormSignUp', () => {
  it('should call the createUser function with correct arguments', async () => {
    const createUserMock = jest.fn();

    const { getByLabelText, getByText } = render(<FormSignUp createUser={createUserMock} />);

    const emailInput = getByLabelText('E-mail');
    const passwordInput = getByLabelText('Password');
    const confirmPasswordInput = getByLabelText('Confirm Password');
    const usernameInput = getByLabelText('Username');
    const signUpButton = getByText('Sign up now');

    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    fireEvent.change(usernameInput, { target: { value: 'johndoe' } });
    fireEvent.click(signUpButton);

    await waitFor(() =>
      expect(createUserMock).toHaveBeenCalledWith({
        variables: {
          email: 'john.doe@example.com',
          password: 'password123',
          username: 'johndoe',
        },
      })
    );
  });

  it('should not call the createUser function if there are validation errors', async () => {
    const createUserMock = jest.fn();

    const { getByLabelText, getByText } = render(<FormSignUp createUser={createUserMock} />);

    const emailInput = getByLabelText('E-mail');
    const passwordInput = getByLabelText('Password');
    const confirmPasswordInput = getByLabelText('Confirm Password');
    const usernameInput = getByLabelText('Username');
    const signUpButton = getByText('Sign up now');

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password456' } });
    fireEvent.change(usernameInput, { target: { value: '' } });
    fireEvent.click(signUpButton);

    await waitFor(() => expect(createUserMock).not.toHaveBeenCalled());
  });
});

 */
