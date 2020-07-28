import React from 'react';
import { waitForElement, fireEvent } from '@testing-library/react';
import DoneRecipes from '../components/DoneRecipes';
import renderWithRouter from './Mocks/RenderService';
import LocalStorage from './Mocks/MockLocalStorage';

window.localStorage = new LocalStorage();

describe('Done recipes screen', () => {
  const doneRecipes = [
    {
      id: '52771',
      type: 'comida',
      area: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'bebida',
      area: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];

  beforeEach(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('All data-testids are available', async () => {
    const { queryByTestId } = renderWithRouter(<DoneRecipes />);

    expect(queryByTestId('filter-by-all-btn')).toBeInTheDocument();
    expect(queryByTestId('filter-by-food-btn')).toBeInTheDocument();
    expect(queryByTestId('filter-by-drink-btn')).toBeInTheDocument();
    expect(queryByTestId('0-horizontal-image')).toBeInTheDocument();
    expect(queryByTestId('0-horizontal-top-text')).toBeInTheDocument();
    expect(queryByTestId('0-horizontal-name')).toBeInTheDocument();
    expect(queryByTestId('0-horizontal-done-date')).toBeInTheDocument();
    expect(queryByTestId('0-horizontal-share-btn')).toBeInTheDocument();
    expect(queryByTestId('0-Pasta-horizontal-tag')).toBeInTheDocument();
    expect(queryByTestId('1-horizontal-image')).toBeInTheDocument();
    expect(queryByTestId('1-horizontal-name')).toBeInTheDocument();
    expect(queryByTestId('1-horizontal-share-btn')).toBeInTheDocument();
    expect(queryByTestId('1-horizontal-done-date')).toBeInTheDocument();
  });

  test('The card has the correct attributes of a food', async () => {
    const { queryByTestId, history } = renderWithRouter(<DoneRecipes />);

    const [
      image,
      category,
      area,
      name,
      doneDate,
      tag1,
      tag2,
      button,
    ] = await waitForElement(() => [
      queryByTestId('0-horizontal-image'),
      queryByTestId('0-horizontal-top-text'),
      queryByTestId('0-horizontal-top-text'),
      queryByTestId('0-horizontal-name'),
      queryByTestId('0-horizontal-done-date'),
      queryByTestId('0-Pasta-horizontal-tag'),
      queryByTestId('0-Curry-horizontal-tag'),
      queryByTestId('0-horizontal-share-btn'),
    ]);

    expect(image).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(area).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(doneDate).toBeInTheDocument();
    expect(tag1).toBeInTheDocument();
    expect(tag2).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    const srcImage = 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg';
    expect(image).toHaveAttribute('src', srcImage);

    fireEvent.click(image);
    expect(history.location.pathname).toBe('comidas/52771');
    fireEvent.click(name);
    expect(history.location.pathname).toBe('comidas/52771');
  });

  test('The card has the correct attributes of a drinks', async () => {
    const { queryByTestId, history } = renderWithRouter(<DoneRecipes />);

    const [
      image,
      name,
      button,
      doneDate,
    ] = await waitForElement(() => [
      queryByTestId('1-horizontal-image'),
      queryByTestId('1-horizontal-name'),
      queryByTestId('1-horizontal-share-btn'),
      queryByTestId('1-horizontal-done-date'),
    ]);

    expect(image).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(doneDate).toBeInTheDocument();

    const drinkImage = 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg';
    expect(image).toHaveAttribute('src', drinkImage);

    fireEvent.click(image);
    expect(history.location.pathname).toBe('bebidas/178319');
    fireEvent.click(name);
    expect(history.location.pathname).toBe('bebidas/178319');
  });

  test('clicking the button should only contain elements referring to that filter ', async () => {
    const { queryByTestId } = renderWithRouter(<DoneRecipes />);

    const [
      all,
      foods,
      drinks,
      nameFood,
      nameDrink,
    ] = await waitForElement(() => [
      queryByTestId('filter-by-all-btn'),
      queryByTestId('filter-by-food-btn'),
      queryByTestId('filter-by-drink-btn'),
      queryByTestId('0-horizontal-name'),
      queryByTestId('1-horizontal-name'),
    ]);

    fireEvent.click(all);
    expect(nameFood).toBeInTheDocument();
    expect(nameDrink).toBeInTheDocument();

    fireEvent.click(drinks);
    expect(nameFood).not.toBeInTheDocument();

    fireEvent.click(foods);
    expect(nameDrink).not.toBeInTheDocument();
  });
});
