import React from 'react';
import PropTypes from 'prop-types';
import { handleChecked } from './MealsControlsRecipeProgress';

function CockTailsControlsRecipeProgress(props) {
  const { valuesToRender } = props;
  const {
    inProgressDrink,
    data,
    checkLocalStorage,
    buttonEnabled,
    id,
    checked,
    history,
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
          <button className="start-button in-progress" enable data-testid="finish-recipe-btn" onClick={(() => history.push('/receitas-feitas'))} type="button">
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
    </div>
  );
}
CockTailsControlsRecipeProgress.propTypes = {
  valuesToRender: PropTypes.string.isRequired,
};

export default CockTailsControlsRecipeProgress;
