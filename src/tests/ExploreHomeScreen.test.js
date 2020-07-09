import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
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

  test('should take to explore food screen', async () => {
    const { getByTestId, history } = renderWithRouter(<ExploreHomeScreen />);
    fireEvent.click(getByTestId('explore-food'));
    expect(history.location.pathname).toEqual('/explorar/comidas');
  });

  test('should take to explore drink screen', async () => {
    const { getByTestId, history } = renderWithRouter(<ExploreHomeScreen />);
    fireEvent.click(getByTestId('explore-drinks'));
    expect(history.location.pathname).toEqual('/explorar/bebidas');
  });

  test('should render header', async () => {
    const { getByTestId, queryByTestId } = renderWithRouter(<ExploreHomeScreen />);

    expect(getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(getByTestId('page-title')).toBeInTheDocument();
    expect(queryByTestId('search-top-btn')).not.toBeInTheDocument();
  });

  test('should render footer', async () => {
    const { getByTestId } = renderWithRouter(<ExploreHomeScreen />);

    expect(getByTestId('drinks-bottom-btn')).toBeInTheDocument();
    expect(getByTestId('explore-bottom-btn')).toBeInTheDocument();
    expect(getByTestId('food-bottom-btn')).toBeInTheDocument();
  });
});
