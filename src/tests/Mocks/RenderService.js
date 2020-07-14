import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import AplicationProvider from '../../context/ContextAplication';

export default function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(
      <Router history={history}>
        <AplicationProvider>
          {ui}
        </AplicationProvider>
      </Router>,
    ),
    history,
  };
}
