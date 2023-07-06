import userEvent from '@testing-library/user-event';

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

// to avoid errors 'create element' - use link too when mocking rounter
// jest.mock('next/link', () => ({
//   __esModule: true,
//   default: function Mock({ children }: { children: React.ReactNode }) {
//     return <div>{children}</div>;
//   }
// }));

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

  it('should submit the form', async () => {
    const mockSignIn = jest.fn();
    jest.mock('next-auth/react', () => ({
      signIn: () => mockSignIn()
    }));

    const handleOnSubmit = jest.fn();

    const { getByRole } = renderWithTheme(<FormSignIn />);

    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText('Password');
    // const button = screen.getByRole('button', { name: /sign in/i });

    // Fill in form fields
    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    const submitButton = getByRole('button', { name: /sign in/i });
    // Submit form
    fireEvent.click(submitButton);

    // Assert that the LoadingButton was clicked and the form was submitted
    expect(handleOnSubmit).toHaveBeenCalled();
  });
});
