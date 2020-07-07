import React from 'react';
import PropTypes from 'prop-types';
// import { changeChecked } from './functionsProgressScreen';

export function handleChecked(event, value, type, values) {
  const { checked, setCountChecked, countChecked, checkLocalStorage, setChecked, id } = values;
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
  localStorage.setItem('inProgressRecipes', JSON.stringify({ [type]: { [id]: checked.checkbox }, countChecked }));
}
function MealsControlsRecipeProgress(props) {
  const { valuesToRender } = props;
  const {
    inProgressRecipe,
    data,
    checkLocalStorage,
    buttonEnabled,
    id,
    checked,
    history,
  } = valuesToRender;
  return (
    <div>
      <h1 data-testid="recipe-title"> Ingredients </h1>
      <h3 data-testid="recipe-category">{inProgressRecipe.strCategory}</h3>
      {data.map((element, i) => (
        <div key={element.meal} data-testid={`${i}-ingredient-step`}>
          <span>
            <input id={i} type="checkbox" checked={checkLocalStorage.meals[id][i].checked} name={element.meal} onClick={(event) => handleChecked(event, checked.checkbox[i].checked, 'meals', valuesToRender)} />
            <span>{element.meal}</span>
            {element.mensure}
          </span>
        </div>
      ))}
      <div data-testid="instructions">
        {inProgressRecipe.strInstructions}
      </div>
      {buttonEnabled
        ? (
          <button enable data-testid="finish-recipe-btn" onClick={(() => history.push('/receitas-feitas'))} type="button">
            Finish Recipe Button
          </button>
        )
        : (
          <button disabled data-testid="finish-recipe-btn" type="button">
            Finish Recipe Button
          </button>
        )}
    </div>
  );
}

export default MealsControlsRecipeProgress;

MealsControlsRecipeProgress.propTypes = {
  valuesToRender: PropTypes.string.isRequired,
};
