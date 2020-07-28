import React from 'react';
import { waitForDomChange, cleanup, fireEvent, screen, wait } from '@testing-library/react';
import ExploreDrinkScreen from '../components/ExploreDrinkScreen';
import ExploreDrinkIngredientScreen from '../components/ExploreDrinkIngredientScreen';
import mockFetch from './Mocks/Fetch';
import renderWithRouter from './Mocks/RenderService';
import drinkIngredients from '../../cypress/mocks/drinkIngredients';
import { act } from 'react-dom/test-utils';

describe('testing Explore Drink Screen', () => {
  afterEach(() => {
    cleanup();
  });

  jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

  test('should have two buttons', async () => {
    const { getByTestId } = renderWithRouter(<ExploreDrinkScreen />);
    expect(getByTestId('explore-by-ingredient')).toBeInTheDocument();
    expect(getByTestId('explore-surprise')).toBeInTheDocument();
  });

  test('should take to explore by ingriedient screen', async () => {
    const { getByTestId, history } = renderWithRouter(<ExploreDrinkScreen />);
    fireEvent.click(getByTestId('explore-by-ingredient'));
    expect(history.location.pathname).toEqual('/explorar/bebidas/ingredientes');
  });

  test('should take to randon recipe details screen', async () => {
    const { getByTestId, history } = renderWithRouter(<ExploreDrinkScreen />);

    fireEvent.click(getByTestId('explore-surprise'));
    await wait(() => expect(global.fetch).toHaveBeenCalled());
    expect(history.location.pathname).toEqual('/bebidas/178319');
  });

  test('should render header', async () => {
    const { getByTestId, queryByTestId } = renderWithRouter(<ExploreDrinkScreen />);

    expect(getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(getByTestId('page-title')).toBeInTheDocument();
    expect(queryByTestId('search-top-btn')).not.toBeInTheDocument();
  });

  test('should render footer', async () => {
    const { getByTestId } = renderWithRouter(<ExploreDrinkScreen />);

    expect(getByTestId('drinks-bottom-btn')).toBeInTheDocument();
    expect(getByTestId('explore-bottom-btn')).toBeInTheDocument();
    expect(getByTestId('food-bottom-btn')).toBeInTheDocument();
  });
});

describe('testing Explore Drink by Ingredient Screen', () => {
  afterEach(() => {
    cleanup();
  });

  jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

  test('should render categories buttons', async () => {
    const { queryByTestId } = renderWithRouter(<ExploreDrinkIngredientScreen />);
    await waitForDomChange();

    drinkIngredients.drinks.slice(0, 12).forEach((igr, idx) => {
      const [
        card,
        cardName,
        cardImage,
      ] = [
          queryByTestId(`${idx}-ingredient-card`),
          queryByTestId(`${idx}-card-name`),
          queryByTestId(`${idx}-card-img`),
        ];
      expect(card).toBeInTheDocument();
      expect(cardName).toHaveTextContent(igr.strIngredient1);
      expect(cardImage).toHaveAttribute('src', `https://www.thecocktaildb.com/images/ingredients/${igr.strIngredient1}-Small.png`);
    });
  });

  test('should take to main recipe screen displaying only light rum recipes', async () => {
    const { getByTestId, history } = renderWithRouter(<ExploreDrinkIngredientScreen />);
    await waitForDomChange();

    fireEvent.click(getByTestId(`0-ingredient-card`));
    await wait(() => expect(global.fetch).toHaveBeenCalled());
    expect(history.location.pathname).toEqual('/bebidas');
  });

  test('should render header', async () => {
    act(() => {
      renderWithRouter(<ExploreDrinkIngredientScreen />);
    })
    expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(screen.getByTestId('page-title')).toBeInTheDocument();
    expect(screen.queryByTestId('search-top-btn')).not.toBeInTheDocument();
  });

  test('should render footer', async () => {
    const { getByTestId } = renderWithRouter(<ExploreDrinkIngredientScreen />);

    expect(getByTestId('drinks-bottom-btn')).toBeInTheDocument();
    expect(getByTestId('explore-bottom-btn')).toBeInTheDocument();
    expect(getByTestId('food-bottom-btn')).toBeInTheDocument();
  });
});
