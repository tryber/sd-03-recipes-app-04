import React from 'react';
import { waitForDomChange, cleanup, fireEvent, waitForElement } from '@testing-library/react';
import ExploreHomeScreen from '../components/ExploreHomeScreen';
import ExploreFoodScreen from '../components/ExploreFoodScreen';
import ExploreFoodIngredientScreen from '../components/ExploreFoodIngredientScreen';
import mockFetch from './Mocks/Fetch';
import renderWithRouter from './Mocks/RenderService';
import mealIngredients from '../../cypress/mocks/mealIngredients';

describe('testing Explore Home Screen', () => {
  afterEach(() => {
    cleanup();
  });

  jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

  test('should have two buttons', async () => {
    const { getByTestId } = renderWithRouter(<ExploreHomeScreen />);
    expect(getByTestId('explore-food')).toBeInTheDocument();
    expect(getByTestId('explore-drinks')).toBeInTheDocument();
  });

  test.skip('should take to explore food screen', async () => {
    const { getByTestId } = renderWithRouter(<ExploreHomeScreen />);
    fireEvent.click(getByTestId('explore-food'));
    await waitForElement(() => expect().toHaveBeenCalledTimes());
    expect(history.location.pathname).toEqual('/explorar/comidas');
  });

  test.skip('should take to explore drink screen', async () => {
    const { getByTestId } = renderWithRouter(<ExploreHomeScreen />);
    fireEvent.click(getByTestId('explore-drinks'));
    await waitForDomChange();
    expect(history.location.pathname).toEqual('/explorar/bebidas');
  });
});

describe('testing Explore Food Screen', () => {
  afterEach(() => {
    cleanup();
  });

  jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

  test('should have three buttons', async () => {
    const { getByTestId } = renderWithRouter(<ExploreFoodScreen />);
    expect(getByTestId('explore-by-ingredient')).toBeInTheDocument();
    expect(getByTestId('explore-by-area')).toBeInTheDocument();
    expect(getByTestId('explore-surprise')).toBeInTheDocument();
  });

  test.skip('should take to explore by ingriedient screen', async () => {
    const { getByTestId } = renderWithRouter(<ExploreFoodScreen />);
    fireEvent.click(getByTestId('explore-by-ingredient'));
    await waitForElement(() => expect().toHaveBeenCalledTimes());
    expect(history.location.pathname).toEqual('/explorar/comidas/ingredientes');
  });

  test.skip('should take to explore by area screen', async () => {
    const { getByTestId } = renderWithRouter(<ExploreFoodScreen />);
    fireEvent.click(getByTestId('explore-by-area'));
    await waitForDomChange();
    expect(history.location.pathname).toEqual('/explorar/comidas/area');
  });

  test.skip('should take to randon recipe details screen', async () => {
    const { getByTestId } = renderWithRouter(<ExploreFoodScreen />);
    fireEvent.click(getByTestId('explore-surprise'));
    await waitForDomChange();
    expect(history.location.pathname).toEqual('/comidas//52771');
  });
});

describe('testing Explore Food by Ingredient Screen', () => {
  afterEach(() => {
    cleanup();
  });

  jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

  test('should render categories buttons', async () => {
    const { queryByTestId } = renderWithRouter(<ExploreFoodIngredientScreen />);

    await waitForDomChange();

    mealIngredients.meals.slice(0, 12).forEach((igr, idx) => {
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
      expect(cardName).toHaveTextContent(igr.strIngredient);
      expect(cardImage).toHaveAttribute('src', `https://www.themealdb.com/images/ingredients/${igr.strIngredient}-Small.png`);
    });
  });
});
