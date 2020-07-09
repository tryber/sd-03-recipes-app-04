import React from 'react';
import MealsRenderRecipesInProgress from '../components/helpersComponents/MealsRenderRecipesInProgress';
import renderWithRouter from './RenderService';

describe('ProgressFoodScreen Tests', () => {
  test('renders App component', () => {
    const obj = { params: { id: '1' } };
    const obj2 = { location: 'test/1200' };
    renderWithRouter(<MealsRenderRecipesInProgress values={{ obj, obj2 }} />);
  });
});
