import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getDrinkByID } from '../services/drink-api';

function ProgressDrinkScreen(props) {
  const [inProgressDrink, setInProgressDrink] = useState([]);
  const { match } = props;
  const { params } = match;
  const { id } = params;
  useEffect(() => {
    getDrinkByID(id).then((data) => {
      console.log(data.drinks[0]);
      setInProgressDrink(data.drinks[0]);
    });
  }, []);
  const quantity = Object.keys(inProgressDrink).filter((e) => e.includes('strIngredient'));
  const ingredients = Object.keys(inProgressDrink).filter((e) => e.includes('strMeasure'));
  return (
    <div>
      <img src={inProgressDrink.strDrinkThumb} alt="" data-testid="recipe-photo" />
      <button type="button" data-testid="share-btn"> share Button </button>
      <button type="button" data-testid="favorite-btn"> Favorite Button</button>
      <h1 data-testid="recipe-title">
        {inProgressDrink.strMeal}
      </h1>
      <h3 data-testid="recipe-category">{inProgressDrink.strCategory}</h3>
      {quantity.map((e, i) => (
        <>
          {console.log(inProgressDrink[`strIngredient${i}`])}
          {inProgressDrink[`strIngredient${i}`] !== ' '
          && inProgressDrink[`strIngredient${i}`] !== null
            ? (
              <div data-testid={`${i}-ingredient-step`}>
                <span>
                  <input type="checkbox" />
                  <span>{inProgressDrink[e]}</span>
                  {inProgressDrink[ingredients[i]]}
                </span>
              </div>
            )
            : null }
        </>

      ))}

      <div data-testid="instructions">
        {inProgressDrink.strInstructions}
      </div>
      <button data-testid="finish-recipe-btn" type="button">
        Finish Recipe Button
      </button>
    </div>
  );
}

ProgressDrinkScreen.propTypes = {
  // id: PropTypes.string.isRequired,
  match: PropTypes.string.isRequired,

};

export default ProgressDrinkScreen;
