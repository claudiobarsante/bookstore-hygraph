import { ThemeProvider } from '@mui/material/styles';
import { render, RenderResult } from '@testing-library/react';
import theme from 'styles/theme';

export const renderWithTheme = (children: React.ReactNode): RenderResult =>
  render(<ThemeProvider theme={theme}>{children}</ThemeProvider>);

export * from '@testing-library/react';

//? For mocking initial state on tests
//https://medium.com/@yevgen4/way-to-test-react-usestate-hook-with-jest-and-enzyme-acfeb1b4f8aa
//to mock useState, use React.useState on the code, not the destrctured {useState}
export const setHookState = (newState: any) =>
  jest.fn().mockImplementation(() => [newState, () => {}]);
