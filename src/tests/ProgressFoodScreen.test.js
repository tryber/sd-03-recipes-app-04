import React from 'react';
import ProgressFoodScreen from '../components/ProgressFoodScreen';
import renderWithRouter from './RenderService';

describe('ProgressFoodScreen Tests', () => {
  test('renders App component', () => {
    const id = 1000;
    const params = 'history';
    const obj = { [params]: { id } };
    renderWithRouter(<ProgressFoodScreen match={obj} />);
  });
});
