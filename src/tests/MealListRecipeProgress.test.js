import React from 'react';
import renderWithRouter from './RenderService';
import MealListRecipeProgress from '../components/helpersComponents/MealListRecipeProgress';

describe('MealListRecipeProgress Tests', () => {
  test('testing component MealsRenderRecipesInProgress', () => {
    const obj = { params: { id: '1' } };
    // const obj2 = { location: 'test/1200' };
    renderWithRouter(<MealListRecipeProgress listValues={obj} />);
  });
});
