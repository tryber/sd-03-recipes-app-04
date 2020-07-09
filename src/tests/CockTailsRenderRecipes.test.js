import React from 'react';
import CockTailsRenderRecipesInProgress from '../components/helpersComponents/CockTailsRenderRecipesInProgress';
import renderWithRouter from './RenderService';

describe('ProgressFoodScreen Tests', () => {
  test('renders App component', () => {
    renderWithRouter(<CockTailsRenderRecipesInProgress />);
  });
});
