import React from 'react';
import { render, screen } from '@testing-library/react';
import ProgressFoodScreen from '../components/ProgressFoodScreen';

describe('ProgressFoodScreen Tests', () => {
  test('renders App component', () => {
    render(<ProgressFoodScreen />);
    screen.debug();
  });
  test('test if label with text ingredients is in component', () => {
    expect(screen.getByText('Ingredients:')).toBeInTheDocument();
  });
  test('test if label with text Instructions is in component', () => {
    expect(screen.getByText('Instructions:')).toBeInTheDocument();
  });
  test('renders App component', () => {
    render(<ProgressFoodScreen />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
