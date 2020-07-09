import React from 'react';
import { waitForDomChange, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DetailsFoodScreen from '../components/DetailsFoodScreen';
import DetailsDrinkScreen from '../components/DetailsDrinkScreen';
import mockFetch from './Mocks/Fetch';
import renderWithRouter from './Mocks/RenderService';

const meal = { match: { params: { id: '52771' } } };
const drink = { match: { params: { id: '178319' } } };

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

describe('Check Food Description Page', () => {
  afterEach(() => {
    cleanup();
  });

  jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
  jest.spyOn(navigator.clipboard, 'writeText');
  test('Check Arrabiata', async () => {
    const { getByText } = renderWithRouter(<DetailsFoodScreen props={meal} />);
    expect(global.fetch).toHaveBeenCalledTimes(2);
    await waitForDomChange();
    expect(getByText('Spicy Arrabiata Penne')).toBeInTheDocument();
  });
  test('check images', async () => {
    const {
      getAllByRole, getByTestId, getAllByTestId, getByText, history,
    } = renderWithRouter(<DetailsFoodScreen props={meal} />);
    await waitForDomChange();
    const img = getAllByRole('img');
    expect(img.length).toBe(10);
    expect(img[1].src).toBe('https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
    const favorite = getByTestId('favorite-btn');
    expect(favorite.src).toBe('http://localhost/whiteHeartIcon.svg');
    expect(favorite).toBeInTheDocument();
    fireEvent.click(favorite);
    expect(favorite.src).toBe('http://localhost/blackHeartIcon.svg');
    expect(getAllByTestId('recipe-photo').length).toBe(7);
    expect(getByTestId('video')).toBeInTheDocument();
    expect(getByTestId('0-recomendation-card')).toBeInTheDocument();
    expect(getByTestId('1-recomendation-card')).toBeVisible();
    const share = getByTestId('share-btn');
    expect(share).toBeInTheDocument();
    fireEvent.click(share);
    expect(getByText('Link copiado!')).toBeInTheDocument();
    const start = getByTestId('start-recipe-btn');
    expect(start).toBeInTheDocument();
    fireEvent.click(start);
    expect(start.textContent).toBe('Iniciar Receita');
    expect(history.location.pathname).toEqual('/comidas/52771/in-progress');
  });
});

describe('Check Drink Description Page', () => {
  afterEach(() => {
    cleanup();
  });

  jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
  jest.spyOn(navigator.clipboard, 'writeText');
  test('GG', async () => {
    const { getByText } = renderWithRouter(<DetailsDrinkScreen props={drink} />);
    expect(global.fetch).toHaveBeenCalledTimes(6);
    await waitForDomChange();
    expect(getByText('Aquamarine')).toBeInTheDocument();
  });
  test('check images', async () => {
    const {
      getAllByRole, getByTestId, getAllByTestId, getByText, history,
    } = renderWithRouter(<DetailsDrinkScreen props={drink} />);
    await waitForDomChange();
    const img = getAllByRole('img');
    expect(img.length).toBe(10);
    expect(img[1].src).toBe('https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');
    const favorite = getByTestId('favorite-btn');
    expect(favorite.src).toBe('http://localhost/whiteHeartIcon.svg');
    expect(favorite).toBeInTheDocument();
    fireEvent.click(favorite);
    expect(favorite.src).toBe('http://localhost/blackHeartIcon.svg');
    expect(getAllByTestId('recipe-photo').length).toBe(7);
    expect(getByTestId('0-recomendation-card')).toBeInTheDocument();
    expect(getByTestId('1-recomendation-card')).toBeVisible();
    const share = getByTestId('share-btn');
    expect(share).toBeInTheDocument();
    fireEvent.click(share);
    expect(getByText('Link copiado!')).toBeInTheDocument();
    const start = getByTestId('start-recipe-btn');
    expect(start).toBeInTheDocument();
    fireEvent.click(start);
    expect(start.textContent).toBe('Iniciar Receita');
    expect(history.location.pathname).toEqual('/bebidas/178319/in-progress');
  });
});
