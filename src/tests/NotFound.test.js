import React from 'react';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotFound from '../components/NotFound';
import mockFetch from './Mocks/Fetch';
import renderWithRouter from './Mocks/RenderService';

describe('Check Food Description Page', () => {
  afterEach(() => {
    cleanup();
  });
  jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
  test('Check no found page', async () => {
    const { getByText } = renderWithRouter(<NotFound />);
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(getByText('Not Found')).toBeInTheDocument();
  });
});
