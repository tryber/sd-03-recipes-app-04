import React from 'react';

import ProgressDrinkScreen from '../components/ProgressDrinkScreen';
import renderWithRouter from './RenderService';

describe('ProgressDrinkScreen Tests', () => {
  test('renders App component', () => {
    const obj = { params: { id: '1' } };
    const obj2 = { location: 'test/1200' };
    renderWithRouter(<ProgressDrinkScreen match={obj} location={obj2} />);
  });
});
