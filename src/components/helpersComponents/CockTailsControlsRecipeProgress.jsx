import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { handleChecked } from './MealsControlsRecipeProgress';

function doneRecipe(recipeInfo, setGoToRoute) {
  const {
    idDrink, strDrink, strDrinkThumb, strAlcoholic, strCategory, strTags,
  } = recipeInfo;
  const drinkInfo = {
    id: idDrink,
    type: 'comida',
    area: '',
    category: strCategory,
    alcoholicOrNot: strAlcoholic,
    name: strDrink,
    image: strDrinkThumb,
    doneDate: new Date(),
    tags: strTags === null ? [] : strTags.split(','),
  };
  let storage = JSON.parse(localStorage.getItem('doneRecipes'));
  if (!storage) {
    storage = [];
    const newStorage = [...storage, drinkInfo];
    localStorage.setItem('doneRecipes', JSON.stringify(newStorage));
  } else {
    const newStorage = [...storage, drinkInfo];
    localStorage.setItem('doneRecipes', JSON.stringify(newStorage));
  }
  setGoToRoute(true);
}

function CockTailsControlsRecipeProgress(props) {
  const [goToRoute, setGoToRoute] = useState(false);
  const { valuesToRender } = props;
  const {
    inProgressDrink, data, checkLocalStorage, buttonEnabled,
    id, checked,
  } = valuesToRender;
  return (
    <div>
      <h1>{inProgressDrink.strDrink}</h1>
      <h2 data-testid="recipe-category">{inProgressDrink.strCategory}</h2>
      <h3 data-testid="recipe-title"> Ingredients </h3>
      {data.map((element, i) => (
        <div key={element.meal} data-testid={`${i}-ingredient-step`}>
          <span>
            <input id={i} type="checkbox" checked={checkLocalStorage.cocktails[id][i].checked} name={element.drink} onClick={(event) => handleChecked(event, checked.checkbox[i].checked, 'cocktails', valuesToRender)} />
            <span>{element.meal}</span>
            {element.mensure}
          </span>
        </div>
      ))}
      <div className="instructions" data-testid="instructions">
        <h3>Instruções</h3>
        {inProgressDrink.strInstructions}
      </div>
      {buttonEnabled
        ? (
          <button className="start-button in-progress" enable data-testid="finish-recipe-btn" onClick={() => doneRecipe(inProgressDrink, setGoToRoute)} type="button">
            Finish Recipe Button
          </button>
        )
        : (
          <button
            className="start-button in-progress"
            disabled
            data-testid="finish-recipe-btn"
            type="button"
          >
            Finish Recipe Button
          </button>
        )}
      {goToRoute && <Redirect to="/receitas-feitas" />}
    </div>
  );
}
CockTailsControlsRecipeProgress.propTypes = {
  valuesToRender: PropTypes.string.isRequired,
};

export default CockTailsControlsRecipeProgress;
