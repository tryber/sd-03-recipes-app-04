import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getMealById } from '../services/foodApi';

function ProgressFoodScreen(props) {
  const [inProgressRecipe, setInProgressRecipe] = useState([]);
  const [ingredientsDone, setIngredientsDone] = useState([]);
  const { match } = props;
  const { params } = match;
  const { id } = params;
  useEffect(() => {
    getMealById(id).then((data) => {
      setInProgressRecipe(data.meals[0]);
    });
  }, []);
  const quantity = Object.keys(inProgressRecipe).filter((e) => e.includes('strIngredient'));
  const ingredients = Object.keys(inProgressRecipe).filter((e) => e.includes('strMeasure'));
  return (
    <div>
      <img src={inProgressRecipe.strMealThumb} alt="" data-testid="recipe-photo" />
      <button type="button" data-testid="share-btn"> share Button </button>
      <button type="button" data-testid="favorite-btn"> Favorite Button</button>
      <h1 data-testid="recipe-title">
        {inProgressRecipe.strMeal}
      </h1>
      <h3 data-testid="recipe-category">{inProgressRecipe.strCategory}</h3>
      {quantity.map((e, i) => (
        <>
          {inProgressRecipe[e] !== null
          && inProgressRecipe[e] !== ''
            ? (
              <div data-testid={`${i}-ingredient-step`}>
                <span>
                  <input type="checkbox" onClick={() => console.log(`clicou em ${inProgressRecipe[e]}`)} />
                  <span>{inProgressRecipe[e]}</span>
                  {inProgressRecipe[ingredients[i]]}
                </span>
              </div>
            )
            : null}
        </>

      ))}

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
