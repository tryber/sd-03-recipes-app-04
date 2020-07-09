import React from 'react';
import {
  waitForDomChange,
  wait,
} from '@testing-library/react';
import ProgressFoodScreen from '../components/ProgressFoodScreen';
import renderWithRouter from './RenderService';

describe('ProgressFoodScreen Tests', () => {
  test('renders ProgressFoodScreen component', () => {
    // const params = 'history';
    const obj = { params: { id: '1' } };
    const obj2 = { location: 'test/1200' };
    renderWithRouter(<ProgressFoodScreen match={obj} location={obj2} />);
  });
  test('should call Api', async () => {
    const obj = { params: { id: '1' } };
    const obj2 = { location: 'test/1200' };
    const { history } = renderWithRouter(<ProgressFoodScreen match={obj} location={obj2} />);
    await waitForDomChange();
    // const searchButton = queryByTestId('search-top-btn');
    await wait(() => expect(global.fetch).toHaveBeenCalled());
    expect(history.location.pathname).toEqual('/comidas/1');
  });
  
});
