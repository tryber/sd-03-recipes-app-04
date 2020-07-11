import React from 'react';
import checkedlist from '../components/checklist';
import { mountRecipeList } from '../components/functionsProgressScreen';
import MealsControlsRecipeProgress from '../components/helpersComponents/MealsControlsRecipeProgress';
import renderWithRouter from './RenderService';
import food from './Food';

describe('MealsControlsRecipeProgress Tests', () => {
  test('renders MealsControlsRecipeProgress component', () => {
    // const obj = { food };
    // const obj2 = { location: 'test/1200' };

    const inProgressRecipe = food;
    const checked = checkedlist;
    const ingredientsDoneList = [];
    const countChecked = 10;
    const checkLocalStorage = { meals: { 15555: checked.checkbox }, countChecked };
    const data = mountRecipeList(inProgressRecipe, checked, ingredientsDoneList);
    renderWithRouter(<MealsControlsRecipeProgress valuesToRender={{ inProgressRecipe, data, checkLocalStorage }} />);
  });
});
