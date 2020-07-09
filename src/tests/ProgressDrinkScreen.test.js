import React from 'react';
import ProgressDrinkScreen from '../components/ProgressDrinkScreen';
import renderWithRouter from './RenderService';

describe('ProgressDrinkScreen Tests', () => {
  test('renders App component', () => {
    renderWithRouter(<ProgressDrinkScreen />);
  });
});
