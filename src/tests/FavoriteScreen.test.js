import React from 'react';
import { waitForDomChange, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FavoriteRecipes from '../components/FavoriteRecipes';
import mockFetch from './Mocks/Fetch';
import renderWithRouter from './Mocks/RenderService';
import LocalStorage from './Mocks/MockLocalStorage';



window.localStorage = new LocalStorage();

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

describe('Check Favorite Screen', () => {
  afterEach(() => {
    cleanup();
  });
  jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
  jest.spyOn(navigator.clipboard, 'writeText');
  test('Check', async () => {
    localStorage.setItem('user', JSON.stringify({ email: 'test@gmail.com' }));
    const { getByText, getByTestId } = renderWithRouter(<FavoriteRecipes />);
    expect(global.fetch).toHaveBeenCalledTimes(0);
    expect(getByText('Receitas Favoritas')).toBeInTheDocument();
    const foodFilter = getByTestId('filter-by-food-btn');
    const drinkFilter = getByTestId('filter-by-drink-btn');
    expect(foodFilter).toBeInTheDocument();
    expect(drinkFilter).toBeInTheDocument();
  });
});
