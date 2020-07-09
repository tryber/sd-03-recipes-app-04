import React from 'react';
import CockTailsControlsRecipeProgress from '../components/helpersComponents/CockTailsControlsRecipeProgress';
import renderWithRouter from './RenderService';

describe('CockTailsControlsRecipeProgress Tests', () => {
  test('renders CockTailsControlsRecipeProgress component', () => {
    renderWithRouter(<CockTailsControlsRecipeProgress />);
  });
/*   test('renders CockTailsControlsRecipeProgress component', () => {
    const { getByRole } = renderWithRouter(<CockTailsControlsRecipeProgress />);
    const categoryElement = getByRole('checkbox');
    expect(categoryElement).tobeInDocument();
  }); */
});
