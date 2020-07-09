import React from 'react';
import renderWithRouter from './RenderService';
import MealListRecipeProgress from '../components/helpersComponents/MealListRecipeProgress';

describe('MealListRecipeProgress Tests', () => {
  test('testing component MealsRenderRecipesInProgress', () => {
    renderWithRouter(<MealListRecipeProgress />);
  });
});
