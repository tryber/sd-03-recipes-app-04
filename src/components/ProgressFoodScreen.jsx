import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getMealById } from '../services/foodApi';

function ProgressFoodScreen(props) {
  const [inProgressRecipe, setInProgressRecipe] = useState([]);
  const [ingredientsDone, setIngredientsDone] = useState([]);
  const [checked, setChecked] = useState(false);

  const { match } = props;
  const { params } = match;
  const { id } = params;
  const ingredientsDoneList = [];

  /*   function saveDoneIngredients(checkedIngredient, checkedParametro) {
    const ingredients = [];
    ingredients.push(...ingredientsDone, checkedIngredient);
    setIngredientsDone(ingredients);
    setChecked(!checkedParametro);
    localStorage.setItem('inProgressRecipes', JSON.stringify({ meals: { id: ingredients, checkedParametro } }));
  } */

  function mountRecipeList(quantity, ingredients) {
    quantity.map((e, i) => (inProgressRecipe[e] !== null && inProgressRecipe[e] !== ''
      ? ingredientsDoneList.push({
        meal: inProgressRecipe[e],
        mensure: inProgressRecipe[ingredients[i]],
        checked,
      })
      : null
    ));

    return ingredientsDoneList;
  }

  useEffect(() => {
    getMealById(id).then((data) => {
      setInProgressRecipe(data.meals[0]);
    });
  }, []);
  const quantity = Object.keys(inProgressRecipe).filter((e) => e.includes('strIngredient'));
  const ingredients = Object.keys(inProgressRecipe).filter((e) => e.includes('strMeasure'));
  const data = mountRecipeList(quantity, ingredients)
  return (
    <div>
      {console.log(data)}
      <div data-testid="instructions">
        {inProgressRecipe.strInstructions}
      </div>
      <button disable data-testid="finish-recipe-btn" type="button">
        Finish Recipe Button
      </button>
    </div>
  );
}

ProgressFoodScreen.propTypes = {
  // id: PropTypes.string.isRequired,
  match: PropTypes.string.isRequired,

};

export default ProgressFoodScreen;
