import React from 'react';
import MealsRenderRecipesInProgress from '../components/helpersComponents/MealsRenderRecipesInProgress';
import renderWithRouter from './RenderService';
import { mountRecipeList } from '../components/functionsProgressScreen';
import checkedlist from '../components/checklist';
import food from './Food';

describe('MealsRenderRecipesInPrMealsRenderRecipesInProgressogress Tests', () => {
  test('renders MealsRenderRecipesInProgress component', () => {
    const obj = { params: { id: '1' } };
    const obj2 = { location: 'test/1200' };

    const inProgressRecipe = food;
    const checked = checkedlist;
    const ingredientsDoneList = [];
    const data = mountRecipeList(inProgressRecipe, checked, ingredientsDoneList);
    renderWithRouter(<MealsRenderRecipesInProgress values={{
      obj, obj2, inProgressRecipe, data,
    }}
    />);
  });
});
