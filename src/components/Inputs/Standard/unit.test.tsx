import userEvent from '@testing-library/user-event';
import { FormValues } from 'components/FormSignUp';
import {
  renderWithTheme,
  screen,
  fireEvent,
  act,
  waitFor
} from 'utils/tests/helpers';
import { FieldErrors } from 'utils/validations';

import StandardInput from '.';

describe('<StandardInput/>', () => {
  it('should update the state of the input fields when a user types in them', async () => {
    const onInput = jest.fn();
    renderWithTheme(
      <StandardInput
        color="primary"
        field="username"
        fieldError={{} as FieldErrors}
        handleOnBlur={() => {}}
        handleOnChange={onInput}
        label="Username"
        values={{} as FormValues}
      />
    );

    const input = screen.getByRole('textbox', { name: /username/i });
    const text = 'This is my new text';
    userEvent.type(input, text);

    await waitFor(() => {
      expect(input).toHaveValue(text);
      expect(onInput).toHaveBeenCalledTimes(text.length);
    });
  });

  it('should render with error', () => {
    renderWithTheme(
      <StandardInput
        color="primary"
        field="username"
        fieldError={{ username: 'This is an error' } as FieldErrors}
        handleOnBlur={() => {}}
        handleOnChange={() => {}}
        label="Username"
        values={{} as FormValues}
      />
    );
    expect(screen.getByText('This is an error')).toBeInTheDocument();
  });
});
