import React from 'react';
import MealsRenderRecipesInProgress from '../components/helpersComponents/MealsRenderRecipesInProgress';
import renderWithRouter from './RenderService';

describe('ProgressFoodScreen Tests', () => {
  test('renders App component', () => {
    renderWithRouter(<MealsRenderRecipesInProgress />);
  });
});
