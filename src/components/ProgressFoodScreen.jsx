import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getMealById } from '../services/foodApi';
import { mountRecipeList, getIfHasBeenFavorited } from './functionsProgressScreen';
import checkedlist, { checkedList } from './checklist';
import MealsRenderRecipesInProgress from './helpersComponents/MealsRenderRecipesInProgress';

function getLocalStorage(id) {
  let checkLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (checkLocalStorage === null) {
    checkLocalStorage = { cocktails: [], meals: [] };
  }

  let arr;

  if (checkLocalStorage.meals[id] === undefined) {
    arr = checkedList.checkbox;
    const newStorage = { ...checkLocalStorage, meals: { ...checkLocalStorage.meals, [id]: arr } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
    checkLocalStorage = newStorage;
  } else {
    arr = checkLocalStorage.meals[id];
    const newStorage = { ...checkLocalStorage, meals: { ...checkLocalStorage.meals, [id]: arr } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
    checkLocalStorage = newStorage;
  }
  return checkLocalStorage;
}
function ProgressFoodScreen(props) {
  const ingredientsDoneList = [];

  const { match: { params: { id } } } = props;
  const { location, history } = props;
  const { pathname } = location;

  const [inProgressRecipe, setInProgressRecipe] = useState([]);
  const [showCopyAlert, setShowCopyAlert] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [countChecked, setCountChecked] = useState(0);
  const [checked, setChecked] = useState(checkedlist);

  const checkLocalStorage = getLocalStorage(id);

  useEffect(() => {
    getMealById(id)
      .then((data) => { setInProgressRecipe(data.meals[0]); });
    if (getIfHasBeenFavorited(id)) { setIsFavorite(true); }
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
