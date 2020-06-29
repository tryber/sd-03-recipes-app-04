import React from 'react';
import {
  fireEvent,
  cleanup,
  waitForElement,
  act,
} from '@testing-library/react';
import nock from 'nock';
import '@testing-library/jest-dom/extend-expect';
import renderWithRouter from './RenderService';
import food from './Food';
import MainFoodScreen from '../components/MainFoodScreen';

nock()
  .get()
  .delay(1000)
  .reply(200, food);

describe('', () => {
  afterEach(() => {
    nock.cleanAll();
    cleanup();
  });

  test('should ', () => {
    const { getByTestId, container } = renderWithRouter(<MainFoodScreen />);
    const [] = waitForElement(() => []);
  });
});
