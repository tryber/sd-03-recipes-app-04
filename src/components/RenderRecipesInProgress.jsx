import React from 'react';
import PropTypes from 'prop-types';
import { changeChecked, clickFavorite } from './functionsProgressScreen';
import ListRecipeProgress from './ListRecipeProgress';

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
        showCopyAlert,
        copyContent,
        isFavorite,
        setIsFavorite,
        getIfHasBeenFavorited,
        pathname,
        clickFavorite,
      }}
      />
    </div>
  );
}

RenderRecipesInProgressMeals.propTypes = {
  values: PropTypes.string.isRequired,
};
export default RenderRecipesInProgressMeals;
