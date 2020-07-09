import React from 'react';
import CockTailsControlsRecipeProgress from '../components/helpersComponents/CockTailsControlsRecipeProgress';
import renderWithRouter from './RenderService';

describe('CockTailsControlsRecipeProgress Tests', () => {
  test('renders CockTailsControlsRecipeProgress component', () => {
    renderWithRouter(<CockTailsControlsRecipeProgress />);
  });
});
