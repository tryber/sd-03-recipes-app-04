import React from 'react';
import { waitForDomChange, cleanup, fireEvent } from '@testing-library/react';
import MainFoodScreen from '../components/MainFoodScreen';
import mockFetch from './Mocks/Fetch';
import renderWithRouter from './Mocks/RenderService';
import meals from '../../cypress/mocks/meals';
import breakfastMeals from '../../cypress/mocks/breakfastMeals';
import mealCategories from '../../cypress/mocks/mealCategories';
// import beefMeals from '../../cypress/mocks/beefMeals';
// import chickenMeals from '../../cypress/mocks/chickenMeals';
// import dessertMeals from '../../cypress/mocks/dessertMeals';
// import goatMeals from '../../cypress/mocks/goatMeals';

const checkRecipes = (recipes, queryByTestId) => {
  const recipeType = 'Meal';

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

describe('testing MainFoodScreen', () => {
  afterEach(() => {
    cleanup();
  });

  jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

  test('should fetch API', async () => {
    const { getByText } = renderWithRouter(<MainFoodScreen />);

    expect(global.fetch).toHaveBeenCalledTimes(3);

    await waitForDomChange();
    expect(getByText('Comidas')).toBeInTheDocument();
  });

  test('should render recipes', async () => {
    const { queryByTestId } = renderWithRouter(<MainFoodScreen />);

    await waitForDomChange();

    meals.meals.slice(0, 12).forEach((food, idx) => {
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
      expect(cardName).toHaveTextContent(food.strMeal);
      expect(cardImage).toHaveAttribute('src', food.strMealThumb);
    });
  });
});

describe('Testing filters buttons', () => {
  afterEach(() => {
    cleanup();
  });

  jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

  test('should 5 firts recipes buttons', async () => {
    const { queryByTestId } = renderWithRouter(<MainFoodScreen />);
    await waitForDomChange();

    mealCategories.meals.slice(0, 5).forEach(({ strCategory: category }) => {
      const filterCategory = queryByTestId(`${category}-category-filter`);
      expect(filterCategory).toBeInTheDocument();
    });

    mealCategories.meals.slice(5).forEach(({ strCategory: category }) => {
      const filterCategory = queryByTestId(`${category}-category-filter`);
      expect(filterCategory).not.toBeInTheDocument();
    });
  });
});

describe('Testing first recipes rendering', () => {
  afterEach(() => {
    cleanup();
  });

  jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

  test('should 5 firts recipes buttons', async () => {
    const { queryByTestId } = renderWithRouter(<MainFoodScreen />);
    await waitForDomChange();

    const beef = queryByTestId('Breakfast-category-filter');
    fireEvent.click(beef);
    await waitForDomChange();
    checkRecipes(breakfastMeals.meals, queryByTestId);
  });
});
