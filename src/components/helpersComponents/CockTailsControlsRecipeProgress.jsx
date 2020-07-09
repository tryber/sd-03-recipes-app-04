import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

export function getDate() {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  today = `${mm}/${dd}/${yyyy}`;
  return today;
}

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
    cocktails: { ...checkLocalStorage.cocktails, [id]: [...checked.checkbox] },
  };
  localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
}

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
    doneDate: getDate(),
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

const renderButton = () => (
  <div>
    <button
      className="start-button in-progress"
      disabled
      data-testid="finish-recipe-btn"
      type="button"
    >
      Finish Recipe Button
    </button>
  </div>
);

function CockTailsControlsRecipeProgress(props) {
  const [goToRoute, setGoToRoute] = useState(false); const { valuesToRender } = props;
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
            <input
              id={i}
              type="checkbox"
              checked={checkLocalStorage.cocktails[id][i].checked}
              name={element.drink}
              onClick={(event) => handleChecked(event, checked.checkbox[i].checked, 'cocktails', valuesToRender)}
            />
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
          <button
            className="start-button in-progress"
            enable
            data-testid="finish-recipe-btn"
            onClick={() => doneRecipe(inProgressDrink, setGoToRoute)}
            type="button"
          >
            Finish Recipe Button
          </button>
        )
        : renderButton()}
      {goToRoute && <Redirect to="/receitas-feitas" />}
    </div>
  );
}
CockTailsControlsRecipeProgress.propTypes = {
  valuesToRender: PropTypes.string.isRequired,
};

export default CockTailsControlsRecipeProgress;
