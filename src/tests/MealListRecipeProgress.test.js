import React from 'react';
import { fireEvent } from '@testing-library/react';
import { mountRecipeList } from '../components/functionsProgressScreen';
import checkedlist from '../components/checklist';
import renderWithRouter from './RenderService';
import MealListRecipeProgress from '../components/helpersComponents/MealListRecipeProgress';
import food from './Food';

describe('MealListRecipeProgress Tests', () => {
  test('testing component MealListRecipeProgress', () => {
    const obj = { params: { id: '1' } };
    // const obj2 = { location: 'test/1200' };

    const inProgressRecipe = food;
    const checked = checkedlist;
    const ingredientsDoneList = [];
    const countChecked = 10;
    const id= 500;
    const checkLocalStorage = { meals: { [id]: checked.checkbox }, countChecked };
    const data = mountRecipeList(inProgressRecipe, checked, ingredientsDoneList);
    const setIsFavorite = () => null;
    const { getByTestId } = renderWithRouter(<MealListRecipeProgress listValues={{
      obj, inProgressRecipe, setIsFavorite, data, checkLocalStorage,
    }}
    />);
    const btnFavorite = getByTestId('favorite-btn');
    fireEvent.click(btnFavorite);
  });
});
