import React from 'react';
import PropTypes from 'prop-types';
import notFavorite from '../images/whiteHeartIcon.svg';
import favorite from '../images/blackHeartIcon.svg';
import ControlsRecipeProgress from './ControlsRecipeProgress';
import { clickFavorite, getIfHasBeenFavorited } from './functionsProgressScreen';

function ListRecipeProgress(props) {
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
        onClick={() => clickFavorite(inProgressRecipe, isFavorite, setIsFavorite, 'comida')}
        src={favorite}
      >
        {getIfHasBeenFavorited(id)
          ? <img data-testid="favorite-btn" src={favorite} alt="favorite" />
          : <img data-testid="favorite-btn" src={notFavorite} alt="favorite" />}
      </button>
      <ControlsRecipeProgress
        valuesToRender={listValues}
      />
    </div>
  );
}
ListRecipeProgress.propTypes = {
  listValues: PropTypes.string.isRequired,
};

export default ListRecipeProgress;
