import React from 'react';
import { waitForDomChange, cleanup, fireEvent, wait } from '@testing-library/react';
import MainDrinkScreen from '../components/MainDrinkScreen';
import mockFetch from './Mocks/Fetch';
import renderWithRouter from './Mocks/RenderService';
import drinks from '../../cypress/mocks/drinks';
import ordinaryDrinks from '../../cypress/mocks/ordinaryDrinks';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import cocktailDrinks from '../../cypress/mocks/cocktailDrinks';

global.alert = jest.fn();

const checkRecipes = (recipes, queryByTestId) => {
  const recipeType = 'Drink';

  recipes.slice(0, 12).forEach((recipe, index) => {
    const title = recipe[`str${recipeType}`];
    expect(queryByTestId(`${index}-recipe-card`)).toBeInTheDocument();
    expect(queryByTestId(`${index}-card-img`)).toHaveAttribute('src');
    expect(queryByTestId(`${index}-card-name`)).toHaveTextContent(title);
  });

  expect(queryByTestId('12-recipe-card')).not.toBeInTheDocument();
  expect(queryByTestId('12-card-img')).not.toBeInTheDocument();
  expect(queryByTestId('12-card-name')).not.toBeInTheDocument();
};

describe('testing MainDrinkScreen', () => {
  afterEach(() => {
    cleanup();
  });

  jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

  test('should fetch API', async () => {
    const { getByText } = renderWithRouter(<MainDrinkScreen />);

    expect(global.fetch).toHaveBeenCalledTimes(3);

    await waitForDomChange();
    expect(getByText('Bebidas')).toBeInTheDocument();
  });

  test('should render recipes', async () => {
    const { queryByTestId } = renderWithRouter(<MainDrinkScreen />);

    await waitForDomChange();

    drinks.drinks.slice(0, 12).forEach((food, idx) => {
      const [
        card,
        cardName,
        cardImage,
      ] = [
        queryByTestId(`${idx}-recipe-card`),
        queryByTestId(`${idx}-card-name`),
        queryByTestId(`${idx}-card-img`),
      ];
      expect(card).toBeInTheDocument();
      expect(cardName).toHaveTextContent(food.strDrink);
      expect(cardImage).toHaveAttribute('src', food.strDrinkThumb);
    });
  });
});

describe('Testing filters buttons', () => {
  afterEach(() => {
    cleanup();
  });

  jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

  test('should 5 first recipes buttons', async () => {
    const { queryByTestId } = renderWithRouter(<MainDrinkScreen />);
    await waitForDomChange();

    drinkCategories.drinks.slice(0, 5).forEach(({ strCategory: category }) => {
      const filterCategory = queryByTestId(`${category}-category-filter`);
      expect(filterCategory).toBeInTheDocument();
    });

    drinkCategories.drinks.slice(5).forEach(({ strCategory: category }) => {
      const filterCategory = queryByTestId(`${category}-category-filter`);
      expect(filterCategory).not.toBeInTheDocument();
    });

    const searchButton = queryByTestId('search-top-btn');
    fireEvent.click(searchButton);
    drinkCategories.drinks.slice(0, 5).forEach(({ strCategory: category }) => {
      const filterCategory = queryByTestId(`${category}-category-filter`);
      expect(filterCategory).not.toBeInTheDocument();
    });
    fireEvent.click(searchButton);
    drinkCategories.drinks.slice(0, 5).forEach(({ strCategory: category }) => {
      const filterCategory = queryByTestId(`${category}-category-filter`);
      expect(filterCategory).toBeInTheDocument();
    });
  });
});

describe('Testing first recipes rendering', () => {
  afterEach(() => {
    cleanup();
  });

  jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

  test('should render only ordinary drinks', async () => {
    const { queryByTestId } = renderWithRouter(<MainDrinkScreen />);
    await waitForDomChange();

    const ordinary = queryByTestId('Ordinary Drink-category-filter');
    fireEvent.click(ordinary);
    await waitForDomChange();
    checkRecipes(ordinaryDrinks.drinks, queryByTestId);
  });

  test('should render only cocktail drinks', async () => {
    const { queryByTestId } = renderWithRouter(<MainDrinkScreen />);
    await waitForDomChange();

    const cocktail = queryByTestId('Cocktail-category-filter');
    fireEvent.click(cocktail);
    await waitForDomChange();
    checkRecipes(cocktailDrinks.drinks, queryByTestId);
  });

  test('double click on filter buttons return all drinks', async () => {
    const { queryByTestId } = renderWithRouter(<MainDrinkScreen />);
    await waitForDomChange();

    const cocktail = queryByTestId('Cocktail-category-filter');
    fireEvent.click(cocktail);
    await waitForDomChange();
    fireEvent.click(cocktail);
    await waitForDomChange();
    checkRecipes(drinks.drinks, queryByTestId);
  });
});

describe('Testing search button', () => {
  afterEach(() => {
    cleanup();
  });

  jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

  test('button should be disabled when input is empty', async () => {
    const { queryByTestId } = renderWithRouter(<MainDrinkScreen />);
    await waitForDomChange();

    const searchButton = queryByTestId('search-top-btn');
    fireEvent.click(searchButton);
    const execSearchButton = queryByTestId('exec-search-btn');
    expect(execSearchButton).toBeDisabled();
  });

  test('should render only recipes with Light rum', async () => {
    const { queryByTestId, getByText } = renderWithRouter(<MainDrinkScreen />);
    await waitForDomChange();

    const searchButton = queryByTestId('search-top-btn');
    fireEvent.click(searchButton);
    fireEvent.click(queryByTestId('ingredient-search-radio'));
    fireEvent.input(queryByTestId('search-input'), {
      target: { value: 'Light rum' },
    });
    fireEvent.click(queryByTestId('exec-search-btn'));
    await waitForDomChange();
    expect(getByText('Banana Daiquiri')).toBeInTheDocument();
  });

  test('should not render any recipe', async () => {
    const { queryByTestId } = renderWithRouter(<MainDrinkScreen />);
    await waitForDomChange();

    window.alert = jest.fn().mockImplementation(() => true);

    const searchButton = queryByTestId('search-top-btn');
    fireEvent.click(searchButton);
    fireEvent.click(queryByTestId('name-search-radio'));
    fireEvent.input(queryByTestId('search-input'), {
      target: { value: 'xablau' },
    });
    fireEvent.click(queryByTestId('exec-search-btn'));

    await wait(() => expect(global.fetch).toHaveBeenCalled());
    expect(window.alert).toHaveBeenLastCalledWith('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  });

  test('should render only recipes with gin', async () => {
    const { queryByTestId, getByText } = renderWithRouter(<MainDrinkScreen />);
    await waitForDomChange();

    const searchButton = queryByTestId('search-top-btn');
    fireEvent.click(searchButton);
    fireEvent.click(queryByTestId('name-search-radio'));
    fireEvent.input(queryByTestId('search-input'), {
      target: { value: 'gin' },
    });
    fireEvent.click(queryByTestId('exec-search-btn'));
    await waitForDomChange();
    expect(getByText('Gin And Tonic')).toBeInTheDocument();
  });

  test('should redirect to details page', async () => {
    const { queryByTestId, history } = renderWithRouter(<MainDrinkScreen />);
    await waitForDomChange();

    const searchButton = queryByTestId('search-top-btn');
    fireEvent.click(searchButton);
    fireEvent.click(queryByTestId('name-search-radio'));
    fireEvent.input(queryByTestId('search-input'), {
      target: { value: 'Aquamarine' },
    });
    fireEvent.click(queryByTestId('exec-search-btn'));
    await wait(() => expect(global.fetch).toHaveBeenCalled());
    expect(history.location.pathname).toEqual('/bebidas/178319');
  });
});
