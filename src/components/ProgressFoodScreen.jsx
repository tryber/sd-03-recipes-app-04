import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getMealById } from '../services/foodApi';
import { mountRecipeList } from './functionsProgressScreen';
import checkedlist from './checklist';
import RenderRecipesInProgressMeals from './RenderRecipesInProgress';

function ProgressFoodScreen(props) {
  const [inProgressRecipe, setInProgressRecipe] = useState([]);
  const [showCopyAlert, setShowCopyAlert] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { match } = props;
  const { params } = match;
  const { id } = params;
  const checkLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const [countChecked, setCountChecked] = useState(0);
  const ingredientsDoneList = [];
  const quantity = Object.keys(inProgressRecipe).filter((e) => e.includes('strIngredient'));
  const ingredients = Object.keys(inProgressRecipe).filter((e) => e.includes('strMeasure'));
  const [checked, setChecked] = useState(checkedlist);

  useEffect(() => {
    getMealById(id).then((data) => {
      setInProgressRecipe(data.meals[0]);
    });
  }, []);

  function getIfHasBeenFavorited(idPar) {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (storage) {
      const favorited = storage.find((e) => e.id === idPar);
      return favorited;
    }
    return false;
  }
  useEffect(() => {
    if (getIfHasBeenFavorited(id)) { setIsFavorite(true); }
  }, [id]);

  useEffect(() => {
    if (checkLocalStorage === null) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({ meals: { [id]: checked.checkbox }, countChecked }));
    }
  }, [checkLocalStorage]);

  useEffect(() => {
  }, [checked, countChecked]);
  const data = mountRecipeList(quantity,
    ingredients, inProgressRecipe, checked, ingredientsDoneList);
  const buttonEnabled = countChecked === data.length;
  const { location, history } = props;
  const { pathname } = location;
  return (
    <RenderRecipesInProgressMeals
      values={{
        data,
        buttonEnabled,
        inProgressRecipe,
        showCopyAlert,
        setShowCopyAlert,
        checkLocalStorage,
        isFavorite,
        getIfHasBeenFavorited,
        id,
        checked,
        setCountChecked,
        setChecked,
        countChecked,
        setIsFavorite,
        pathname,
        history,
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
