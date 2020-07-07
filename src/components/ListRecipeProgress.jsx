import React from 'react';
import PropTypes from 'prop-types';
import notFavorite from '../images/whiteHeartIcon.svg';
import favorite from '../images/blackHeartIcon.svg';
import ControlsRecipeProgress from './ControlsRecipeProgress';

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
    clickFavorite,
    isFavorite,
    setIsFavorite,
    getIfHasBeenFavorited,
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
      <ControlsRecipeProgress valuesToRender={{
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
      }}
      />
    </div>
  );
}
ListRecipeProgress.propTypes = {
  listValues: PropTypes.string.isRequired,
};

export default ListRecipeProgress;
