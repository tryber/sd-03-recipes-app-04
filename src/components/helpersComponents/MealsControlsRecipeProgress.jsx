import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { getDate } from './CockTailsControlsRecipeProgress';

export function handleChecked(event, value, type, values) {
  const {
    checked, setCountChecked, countChecked, checkLocalStorage, setChecked, id,
  } = values;
  checked.checkbox.forEach((checkbox, i) => {
    if (event.target.checked === true) {
      setCountChecked(countChecked + 1);
    } if (event.target.checked === false) {
      if (checkLocalStorage.countChecked < 0) {
        setCountChecked(countChecked + 1);
      } else {
        setCountChecked(countChecked - 1);
      }
    }
    if (checkbox.id === Number(event.target.id)) {
      checked.checkbox[i].checked = event.target.checked;
    }
  });
  setChecked((prevState) => ({
    ...prevState,
    checked: {
      ...prevState.checkbox.checked,
      checkbox: value,
    },
  }));
  const newStorage = {
    ...checkLocalStorage,
    meals: { ...checkLocalStorage.meals, [id]: [...checked.checkbox] },
  };
  localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
}

function doneRecipe(recipeInfo, setGoToRoute) {
  const {
    idMeal, strArea, strCategory, strMeal, strMealThumb, strTags,
  } = recipeInfo;
  const mealInfo = {
    id: idMeal,
    type: 'comida',
    area: strArea,
    category: strCategory,
    alcoholicOrNot: '',
    name: strMeal,
    image: strMealThumb,
    doneDate: getDate(),
    tags: strTags === null ? [] : strTags.split(','),
  };
  let storage = JSON.parse(localStorage.getItem('doneRecipes'));
  if (!storage) {
    storage = [];
    const newStorage = [...storage, mealInfo];
    localStorage.setItem('doneRecipes', JSON.stringify(newStorage));
  } else {
    const newStorage = [...storage, mealInfo];
    localStorage.setItem('doneRecipes', JSON.stringify(newStorage));
  }
  setGoToRoute(true);
}

const renderButton = (inProgressRecipe, setGoToRoute) => (
  <div>
    <button
      className="start-button in-progress"
      enable
      data-testid="finish-recipe-btn"
      onClick={() => doneRecipe(inProgressRecipe, setGoToRoute)}
      type="button"
    >
      Finish Recipe Button
    </button>
  </div>
);

function MealsControlsRecipeProgress(props) {
  const [goToRoute, setGoToRoute] = useState(false);
  const { valuesToRender } = props;
  const {
    inProgressRecipe, data, checkLocalStorage, buttonEnabled,
    id, checked,
  } = valuesToRender;
  return (
    <div>
      <h1 data-testid="recipe-category">{inProgressRecipe.strMeal}</h1>
      <h2 data-testid="recipe-category">{inProgressRecipe.strCategory}</h2>
      <h3 data-testid="recipe-title"> Ingredients </h3>
      {data.map((element, i) => (
        <div key={element.meal} data-testid={`${i}-ingredient-step`}>
          <span>
            {/* {console.log(checkLocalStorage.meals[id][i])} */}
            <input id={i} type="checkbox" checked={checkLocalStorage.meals[id][i].checked} name={element.meal} onClick={(event) => handleChecked(event, checked.checkbox[i].checked, 'meals', valuesToRender)} />
            <span>{element.meal}</span>
            {element.mensure}
          </span>
        </div>
      ))}
      <div className="instructions" data-testid="instructions">
        <h3>Instruções</h3>
        <p>{inProgressRecipe.strInstructions}</p>
      </div>
      <div>
        {buttonEnabled
          ? (
            renderButton(inProgressRecipe, setGoToRoute)
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
      </div>
      {goToRoute && <Redirect to="/receitas-feitas" />}
    </div>
  );
}

export default MealsControlsRecipeProgress;

MealsControlsRecipeProgress.propTypes = {
  valuesToRender: PropTypes.string.isRequired,
};
