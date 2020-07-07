import React from 'react';
import PropTypes from 'prop-types';
import notFavorite from '../../images/whiteHeartIcon.svg';
import favorite from '../../images/blackHeartIcon.svg';
import CockTailsControlsRecipeProgress from './CockTailsControlsRecipeProgress';
import { clickFavorite, getIfHasBeenFavorited } from './MealsfunctionsProgressScreen';

function CockTailsListRecipeProgress(props) {
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
        className="favourite"
        onClick={() => clickFavorite(inProgressRecipe, isFavorite, setIsFavorite, 'bebida')}
        src={favorite}
      >
        {getIfHasBeenFavorited(id)
          ? <img data-testid="favorite-btn" src={favorite} alt="favorite" />
          : <img data-testid="favorite-btn" src={notFavorite} alt="favorite" />}
      </button>
      <CockTailsControlsRecipeProgress
        valuesToRender={listValues}
      />
    </div>
  );
}
CockTailsListRecipeProgress.propTypes = {
  listValues: PropTypes.string.isRequired,
};

export default CockTailsListRecipeProgress;
