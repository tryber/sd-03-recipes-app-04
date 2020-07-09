import React from 'react';
import ProgressFoodScreen from '../components/ProgressFoodScreen';
import renderWithRouter from './RenderService';

describe('ProgressFoodScreen Tests', () => {
  test('renders App component', () => {
    renderWithRouter(<ProgressFoodScreen />);
  });
});
