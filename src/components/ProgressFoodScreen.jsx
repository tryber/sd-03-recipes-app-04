import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getMealById } from '../services/foodApi';
import { mountRecipeList, getIfHasBeenFavorited } from './functionsProgressScreen';
import checkedlist from './checklist';
import MealsRenderRecipesInProgress from './helpersComponents/MealsRenderRecipesInProgress';

function ProgressFoodScreen(props) {
  const ingredientsDoneList = [];
  const checkLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));

  const { match: { params: { id } } } = props;
  const { location, history } = props;
  const { pathname } = location;

  const [inProgressRecipe, setInProgressRecipe] = useState([]);
  const [showCopyAlert, setShowCopyAlert] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [countChecked, setCountChecked] = useState(0);
  const [checked, setChecked] = useState(checkedlist);

  useEffect(() => {
    getMealById(id)
      .then((data) => { setInProgressRecipe(data.meals[0]); });
    if (getIfHasBeenFavorited(id)) { setIsFavorite(true); }
    if (checkLocalStorage === null || checkLocalStorage.meals === undefined) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({ meals: { [id]: checked.checkbox }, countChecked }));
    }
  }, [id, checkLocalStorage, checked, countChecked]);

  const data = mountRecipeList(inProgressRecipe, checked, ingredientsDoneList);
  const buttonEnabled = countChecked === data.length;
  console.log(data);
  return (
    <MealsRenderRecipesInProgress
      values={{
        data,
        buttonEnabled,
        inProgressRecipe,
        showCopyAlert,
        setShowCopyAlert,
        checkLocalStorage,
        isFavorite,
        id,
        checked,
        setCountChecked,
        setChecked,
        countChecked,
        setIsFavorite,
        history,
        pathname,
      }}
    />
  );
}
ProgressFoodScreen.propTypes = {
  match: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  history: PropTypes.string.isRequired,
};

export default ProgressFoodScreen;
