import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getMealById } from '../services/foodApi';

function ProgressFoodScreen(props) {
  const [inProgressRecipe, setInProgressRecipe] = useState([]);
  const { match } = props;
  const { params } = match;
  const { id } = params;
  useEffect(() => {
    getMealById(id).then((data) => {
      setInProgressRecipe(data.meals[0]);
      /*       console.log(data.meals[0]);
 */ });
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
      {console.log(quantity, ingredients)}

      {quantity.map((e, i) => (
        <div data-testid={`${i}-ingredient-name-and-measure`}>
          <span>
            <input type="checkbox" />
            {inProgressRecipe[ingredients[i]]}
          </span>
          <span>{inProgressRecipe[e]}</span>
        </div>
      ))}

      <div data-testid="instructions">
        {inProgressRecipe.strInstructions}
      </div>
      <button data-testid="finish-recipe-btn" type="button">
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
