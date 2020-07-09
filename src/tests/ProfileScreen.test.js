import React from 'react';
import {
  fireEvent,
  cleanup,
  waitForElement,
  act,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderWithRouter from './Mocks/RenderService';
import ProfileScreen from '../components/ProfileScreen';
import LocalStorage from './Mocks/MockLocalStorage';

window.localStorage = new LocalStorage();

describe('Test profile screen component', () => {
  afterEach(() => cleanup());
  beforeEach(() => localStorage.clear());

  test('testing component rendering', async () => {
    localStorage.setItem('user', JSON.stringify({ email: 'test@gmail.com' }));
    const { getByTestId, getByText } = renderWithRouter(<ProfileScreen />);
    const [
      profile,
      email,
      reciveDone,
      reciveFavorite,
      goOut,
    ] = await waitForElement(() => [
      getByText(/Perfil/i),
      getByTestId('profile-email'),
      getByTestId('profile-done-btn'),
      getByTestId('profile-favorite-btn'),
      getByTestId('profile-logout-btn'),
    ]);

    act(() => {
      expect(profile).toBeInTheDocument();
      expect(email).toBeInTheDocument();
      expect(reciveDone).toBeInTheDocument();
      expect(reciveFavorite).toBeInTheDocument();
      expect(goOut).toBeInTheDocument();
    });
  });

  test('testing buttons functionality', async () => {
    localStorage.setItem('user', JSON.stringify({ email: 'test@gmail.com' }));
    const { getByTestId, history } = renderWithRouter(<ProfileScreen />);
    const [
      buttonDone,
      buttonFavorites,
      buttonLogout,
    ] = await waitForElement(() => [
      getByTestId('profile-done-btn'),
      getByTestId('profile-favorite-btn'),
      getByTestId('profile-logout-btn'),
    ]);

    act(() => {
      fireEvent.click(buttonDone);
      expect(history.location.pathname).toEqual('/receitas-feitas');
      fireEvent.click(buttonFavorites);
      expect(history.location.pathname).toEqual('/receitas-favoritas');
      fireEvent.click(buttonLogout);
      expect(history.location.pathname).toEqual('/');
    });
  });
});
