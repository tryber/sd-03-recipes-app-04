import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FavoriteRecipes from '../components/FavoriteRecipes';
import mockFetch from './Mocks/Fetch';
import renderWithRouter from './Mocks/RenderService';
import LocalStorage from './Mocks/MockLocalStorage';

window.localStorage = new LocalStorage();

const storage = [{
  alcoholicOrNot: '',
  area: 'Canadian',
  category: 'Dessert',
  id: '52929',
  image: 'https://www.themealdb.com/images/media/meals/txsupu1511815755.jpg',
  name: 'Timbits',
  type: 'comida',
}, {
  alcoholicOrNot: 'Alcoholic',
  area: '',
  category: 'Ordinary Drink',
  id: '17203',
  image: 'https://www.thecocktaildb.com/images/media/drink/apneom1504370294.jpg',
  name: 'Kir',
  type: 'bebida',
}];

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
  test('Check dom elements', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(storage));
    const {
      getByText, getByTestId, queryByTestId, queryByText, history,
    } = renderWithRouter(<FavoriteRecipes />);
    expect(global.fetch).toHaveBeenCalledTimes(0);
    expect(queryByTestId('search-top-btn')).not.toBeInTheDocument();
    expect(getByText('Receitas Favoritas')).toBeInTheDocument();
    expect(queryByText('Timbits')).toBeInTheDocument();
    expect(queryByText('Kir')).toBeInTheDocument();
    expect(queryByText('Canadian - Dessert')).toBeInTheDocument();
    expect(queryByText('Alcoholic')).toBeInTheDocument();
    const foodFilter = getByTestId('filter-by-food-btn');
    const drinkFilter = getByTestId('filter-by-drink-btn');
    const filter = getByTestId('filter-by-all-btn');
    expect(foodFilter).toBeInTheDocument();
    expect(drinkFilter).toBeInTheDocument();
    expect(filter).toBeInTheDocument();
    fireEvent.click(drinkFilter);
    expect(queryByText('Timbits')).not.toBeInTheDocument();
    expect(queryByText('Kir')).toBeInTheDocument();
    fireEvent.click(foodFilter);
    expect(queryByText('Timbits')).toBeInTheDocument();
    expect(queryByText('Kir')).not.toBeInTheDocument();
    fireEvent.click(filter);
    expect(queryByText('Timbits')).toBeInTheDocument();
    expect(queryByText('Kir')).toBeInTheDocument();
    const share = getByTestId('0-horizontal-share-btn');
    expect(share).toBeInTheDocument();
    fireEvent.click(share);
    expect(getByText('Link copiado!')).toBeInTheDocument();
    const favorite = getByTestId('0-horizontal-favorite-btn');
    fireEvent.click(favorite);
    const food = queryByText('Timbits');
    expect(food).not.toBeInTheDocument();
    expect(queryByTestId('1-horizontal-favorite-btn')).not.toBeInTheDocument();
    const img = getByTestId('0-horizontal-image');
    fireEvent.click(img);
    expect(history.location.pathname).toEqual('/bebidas/17203');
  });
});
