import React from 'react';
import PropTypes from 'prop-types';
import notFavorite from '../images/whiteHeartIcon.svg';
import favorite from '../images/blackHeartIcon.svg';
import { changeChecked, clickFavorite } from './functionsProgressScreen';
import share from '../images/shareIcon.svg';

function RenderRecipesInProgressMeals(props) {
  const { values } = props;
  const {
    inProgressRecipe,
    data,
    showCopyAlert,
    copyContent,
    checkLocalStorage,
    isFavorite,
    setIsFavorite,
    getIfHasBeenFavorited,
    buttonEnabled,
    id,
    checked,
    setCountChecked,
    setChecked,
    countChecked,
    pathname,
    history,
  } = values;
  return (
    <div>
      <div>
        <img src={inProgressRecipe.strMealThumb} alt="" data-testid="recipe-photo" />
        {showCopyAlert ? <h2>Link copiado!</h2> : null}
        <button
          type="button"
          data-testid="share-btn"
          onClick={(event) => copyContent(`http://localhost:3000/${pathname}`, event)}
          className="favourite"
        >
          <img src={share} alt="icon" />
        </button>

        <button
          type="button"
          className="favourite"
          onClick={() => clickFavorite(inProgressRecipe, isFavorite, setIsFavorite, 'comida')}
          src={favorite}
        >
          {getIfHasBeenFavorited(id)
            ? <img data-testid="favorite-btn" src={favorite} alt="favorite" />
            : <img data-testid="favorite-btn" src={notFavorite} alt="favorite" />}
        </button>

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
    </div>
  );
}

RenderRecipesInProgressMeals.propTypes = {
  values: PropTypes.string.isRequired,
};
export default RenderRecipesInProgressMeals;
