import React from 'react';
import CockTailsListRecipeProgress from '../components/helpersComponents/CockTailsListRecipeProgress';
import renderWithRouter from './RenderService';

describe('CockTailsListRecipeProgress Tests', () => {
  test('renders CockTailsListRecipeProgress component', () => {
    renderWithRouter(<CockTailsListRecipeProgress />);
  });
});
