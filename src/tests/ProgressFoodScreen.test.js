import React from 'react';
import ProgressFoodScreen from '../components/ProgressFoodScreen';
import renderWithRouter from './RenderService';

describe('ProgressFoodScreen Tests', () => {
  test('renders ProgressFoodScreen component', () => {
    // const params = 'history';
    const obj = { params: { id: '1' } };
    const obj2 = { location: 'test/1200' };
    renderWithRouter(<ProgressFoodScreen match={obj} location={obj2} />);
  });
});
