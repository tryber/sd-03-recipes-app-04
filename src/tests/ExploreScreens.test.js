import React from 'react';
import { waitForDomChange, cleanup, fireEvent, waitForElement } from '@testing-library/react';
import ExploreHomeScreen from '../components/ExploreHomeScreen';
import mockFetch from './Mocks/Fetch';
import renderWithRouter from './Mocks/RenderService';

describe('testing Explore Home Screen', () => {
  afterEach(() => {
    cleanup();
  });

  jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

  test('should have two buttons', async () => {
    const { getByTestId } = renderWithRouter(<ExploreHomeScreen />);
    expect(getByTestId('explore-food')).toBeInTheDocument();
    expect(getByTestId('explore-drinks')).toBeInTheDocument();
  });

  test.skip('should take to explore food screen', async () => {
    const { getByTestId } = renderWithRouter(<ExploreHomeScreen />);
    fireEvent.click(getByTestId('explore-food'));
    await waitForElement(() => expect().toHaveBeenCalledTimes());
    expect(history.location.pathname).toEqual('/explorar/comidas');
  });

  test.skip('should take to explore drink screen', async () => {
    const { getByTestId } = renderWithRouter(<ExploreHomeScreen />);
    fireEvent.click(getByTestId('explore-drinks'));
    await waitForElement(() => expect().toHaveBeenCalledTimes());
    expect(history.location.pathname).toEqual('/explorar/bebidas');
  });
  
});