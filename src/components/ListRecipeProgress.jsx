import React from 'react';
import PropTypes from 'prop-types';

function ListRecipeProgress(props) {
  const { listValues } = props;
  const {
    inProgressRecipe,
    data,
    checkLocalStorage,
    buttonEnabled,
    id,
    checked,
    setCountChecked,
    setChecked,
    countChecked,
    history,
    changeChecked,
  } = listValues;
  return (
    <div>
      <h1 data-testid="recipe-title"> Ingredients </h1>
      <h3 data-testid="recipe-category">{inProgressRecipe.strCategory}</h3>
      {data.map((element, i) => (
        <div key={element.meal} data-testid={`${i}-ingredient-step`}>
          <span>
            <input id={i} type="checkbox" checked={checkLocalStorage.meals[id][i].checked} name={element.meal} onClick={(event) => changeChecked(event, checked.checkbox[i].checked, setCountChecked, setChecked, checked, countChecked, checkLocalStorage, id, 'meals')} />
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
ListRecipeProgress.propTypes = {
  listValues: PropTypes.string.isRequired,
};

export default ListRecipeProgress;
