import React from 'react';
import MealsControlsRecipeProgress from '../components/helpersComponents/MealsControlsRecipeProgress';
import renderWithRouter from './RenderService';

describe('MealsControlsRecipeProgress Tests', () => {
  test('renders MealsControlsRecipeProgress component', () => {
    renderWithRouter(<MealsControlsRecipeProgress />);
  });
});
