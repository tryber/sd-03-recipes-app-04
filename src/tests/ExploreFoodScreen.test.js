import React from 'react';
import { waitForDomChange, cleanup, fireEvent, wait } from '@testing-library/react';
import ExploreFoodScreen from '../components/ExploreFoodScreen';
import ExploreFoodIngredientScreen from '../components/ExploreFoodIngredientScreen';
import ExploreFoodOriginScreen from '../components/ExploreFoodOriginScreen';
import mockFetch from './Mocks/Fetch';
import renderWithRouter from './Mocks/RenderService';
import mealIngredients from '../../cypress/mocks/mealIngredients';
import areas from '../../cypress/mocks/areas';
import meals from '../../cypress/mocks/meals';
import japaneseMeals from '../../cypress/mocks/japaneseMeals';

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

  test('should take to explore by ingriedient screen', async () => {
    const { getByTestId, history } = renderWithRouter(<ExploreFoodScreen />);
    fireEvent.click(getByTestId('explore-by-ingredient'));
    expect(history.location.pathname).toEqual('/explorar/comidas/ingredientes');
  });

  test('should take to explore by area screen', async () => {
    const { getByTestId, history } = renderWithRouter(<ExploreFoodScreen />);
    fireEvent.click(getByTestId('explore-by-area'));
    expect(history.location.pathname).toEqual('/explorar/comidas/area');
  });

  test('should take to randon recipe details screen', async () => {
    const { getByTestId, history } = renderWithRouter(<ExploreFoodScreen />);

    fireEvent.click(getByTestId('explore-surprise'));
    await wait(() => expect(global.fetch).toHaveBeenCalled());
    expect(history.location.pathname).toEqual('/comidas/52771');
  });

  test('should render header', async () => {
    const { getByTestId, queryByTestId } = renderWithRouter(<ExploreFoodScreen />);

    expect(getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(getByTestId('page-title')).toBeInTheDocument();
    expect(queryByTestId('search-top-btn')).not.toBeInTheDocument();
  });

  test('should render footer', async () => {
    const { getByTestId } = renderWithRouter(<ExploreFoodScreen />);

    expect(getByTestId('drinks-bottom-btn')).toBeInTheDocument();
    expect(getByTestId('explore-bottom-btn')).toBeInTheDocument();
    expect(getByTestId('food-bottom-btn')).toBeInTheDocument();
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

  test('should take to main recipe screen displaying only chicken recipes', async () => {
    const { getByTestId, history } = renderWithRouter(<ExploreFoodIngredientScreen />);
    await waitForDomChange();

    fireEvent.click(getByTestId(`0-ingredient-card`));
    await wait(() => expect(global.fetch).toHaveBeenCalled());
    expect(history.location.pathname).toEqual('/comidas');
  });

  test('should render header', async () => {
    const { getByTestId, queryByTestId } = renderWithRouter(<ExploreFoodIngredientScreen />);

    expect(getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(getByTestId('page-title')).toBeInTheDocument();
    expect(queryByTestId('search-top-btn')).not.toBeInTheDocument();
  });

  test('should render footer', async () => {
    const { getByTestId } = renderWithRouter(<ExploreFoodIngredientScreen />);

    expect(getByTestId('drinks-bottom-btn')).toBeInTheDocument();
    expect(getByTestId('explore-bottom-btn')).toBeInTheDocument();
    expect(getByTestId('food-bottom-btn')).toBeInTheDocument();
  });
});

describe('testing Explore Food by Area Screen', () => {
  afterEach(() => {
    cleanup();
  });

  jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

  test('should render area dropout', async () => {
    const { getByTestId } = renderWithRouter(<ExploreFoodOriginScreen />);

    await waitForDomChange();

    areas.meals.forEach((area) => {
      const areaSelect = getByTestId(`${area.strArea}-option`)
      expect(areaSelect).toBeInTheDocument();
      expect(areaSelect).toHaveTextContent(area.strArea);
    });
  });

  test('should render all recipes initially', async () => {
    const { queryByTestId } = renderWithRouter(<ExploreFoodOriginScreen />);
    await waitForDomChange();

    checkRecipes(meals.meals, queryByTestId);
  });

  test('should render japanese recipes', async () => {
    const { queryByTestId, getByText, getByTestId } = renderWithRouter(<ExploreFoodOriginScreen />);
    
    await wait(() => getByTestId('explore-by-area-dropdown'));
    await wait(() => getByTestId('Japanese-option'));
    const areaDropdown = getByTestId('explore-by-area-dropdown');
    const japaneseOption = getByTestId('Japanese-option');

    expect(getByText('Japanese')).toBeInTheDocument();
    fireEvent.click(getByText('Japanese'));
    await wait();

    expect(areaDropdown).toBeInTheDocument();
    expect(japaneseOption).toBeInTheDocument();
    const fetchMock = jest.spyOn(global, 'fetch');

    fireEvent.change(areaDropdown, { target: { value: 'Japanese' } });
    await wait();

    expect(fetchMock).toHaveBeenLastCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?a=Japanese');

    checkRecipes(japaneseMeals.meals, queryByTestId);
  });

  test('should render header', async () => {
    const { getByTestId, queryByTestId } = renderWithRouter(<ExploreFoodIngredientScreen />);

    expect(getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(getByTestId('page-title')).toBeInTheDocument();
    expect(queryByTestId('search-top-btn')).not.toBeInTheDocument();
  });

  test('should render footer', async () => {
    const { getByTestId } = renderWithRouter(<ExploreFoodIngredientScreen />);

    expect(getByTestId('drinks-bottom-btn')).toBeInTheDocument();
    expect(getByTestId('explore-bottom-btn')).toBeInTheDocument();
    expect(getByTestId('food-bottom-btn')).toBeInTheDocument();
  });
});
