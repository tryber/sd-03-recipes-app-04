import React from 'react';
import PropTypes from 'prop-types';
import notFavorite from '../images/whiteHeartIcon.svg';
import favorite from '../images/blackHeartIcon.svg';
import { changeChecked, clickFavorite } from './functionsProgressScreen';
import ListRecipeProgress from './ListRecipeProgress';
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
        <ListRecipeProgress listValues={{
          data,
          inProgressRecipe,
          buttonEnabled,
          checked,
          checkLocalStorage,
          setCountChecked,
          setChecked,
          countChecked,
          history,
          changeChecked,
          id,
        }}
        />
      </div>
    </div>
  );
}

RenderRecipesInProgressMeals.propTypes = {
  values: PropTypes.string.isRequired,
};
export default RenderRecipesInProgressMeals;
