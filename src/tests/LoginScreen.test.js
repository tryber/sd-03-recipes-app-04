import React from 'react';
import {
  cleanup,
  fireEvent,
  act,
  waitForElement,
} from '@testing-library/react';
import renderWithRouter from './Mocks/RenderService';
import 'jest-mock';
import { ContextAplication } from '../context/ContextAplication';
import LoginScreen from '../components/LoginScreen';

const saveInput = jest.fn();

describe('Testing login screen', () => {
  afterEach(cleanup);

  test('renders a reading with the text Login', () => {
    const { getByText } = renderWithRouter(
      <ContextAplication.Provider value={saveInput}>
        <LoginScreen />
      </ContextAplication.Provider>,
    );

    act(() => {
      const login = getByText(/Login/i);
      expect(login).toBeInTheDocument();
    });
  });

  test('should check dataTestId', () => {
    const { getByTestId } = renderWithRouter(<LoginScreen />);

    act(() => {
      const inputEmail = getByTestId('email-input');
      const inputPassword = getByTestId('password-input');
      const inputButton = getByTestId('login-submit-btn');

      expect(inputEmail).not.toBeNull();
      expect(inputPassword).not.toBeNull();
      expect(inputButton).not.toBeNull();
    });
  });

  test('should check event', async () => {
    const { getByTestId } = renderWithRouter(<LoginScreen />);

    const [
      email,
      password,
      inputEmail,
      inputPassword,
      inputButton,
    ] = await waitForElement(() => [
      'test@gmail.com',
      '123456',
      getByTestId('email-input'),
      getByTestId('password-input'),
      getByTestId('login-submit-btn'),
    ]);

    act(() => {
      fireEvent.input(inputEmail, {
        target: { value: email },
      });
      fireEvent.input(inputPassword, {
        taget: { value: password },
      });
      expect(inputButton).toBeVisible();
    });
  });

  test('testing false results', async () => {
    const { getByTestId } = renderWithRouter(<LoginScreen />);

    const [
      email,
      password,
      inputEmail,
      inputPassword,
      inputButton,
    ] = await waitForElement(() => [
      'test@gmail.com',
      '123456',
      getByTestId('email-input'),
      getByTestId('password-input'),
      getByTestId('login-submit-btn'),
      getByTestId('login-submit-btn'),
    ]);

    act(() => {
      fireEvent.input(inputEmail, {
        target: { value: email },
      });
      fireEvent.input(inputPassword, {
        taget: { value: password },
      });
      expect(inputButton).toBeDisabled();
    });
  });
});
