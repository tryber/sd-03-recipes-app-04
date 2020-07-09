import React from 'react';
import MealsControlsRecipeProgress from '../components/helpersComponents/MealsControlsRecipeProgress';
import renderWithRouter from './RenderService';
import food from './Food';

describe('MealsControlsRecipeProgress Tests', () => {
  test('renders MealsControlsRecipeProgress component', () => {
    const obj = { food };
    // const obj2 = { location: 'test/1200' };
    renderWithRouter(<MealsControlsRecipeProgress valuesToRender={obj} />);
  });
});
