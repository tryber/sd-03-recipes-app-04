import React from 'react';
import PropTypes from 'prop-types';
import notFavorite from '../../images/whiteHeartIcon.svg';
import favorite from '../../images/blackHeartIcon.svg';
import MealsControlsRecipeProgress from './MealsControlsRecipeProgress';
import { clickFavorite, getIfHasBeenFavorited } from '../functionsProgressScreen';

function MealsListRecipeProgress(props) {
  const { listValues } = props;
  const {
    inProgressRecipe,
    id,
    isFavorite,
    setIsFavorite,
  } = listValues;
  return (
    <div>
      <button
        type="button"
        className="favourite-progress"
        onClick={() => clickFavorite(inProgressRecipe, isFavorite, setIsFavorite, 'comida')}
        src={favorite}
      >
        {getIfHasBeenFavorited(id)
          ? <img data-testid="favorite-btn" src={favorite} alt="favorite" />
          : <img data-testid="favorite-btn" src={notFavorite} alt="favorite" />}
      </button>
      <MealsControlsRecipeProgress
        valuesToRender={listValues}
      />
    </div>
  );
}
MealsListRecipeProgress.propTypes = {
  listValues: PropTypes.string.isRequired,
};

export default MealsListRecipeProgress;
