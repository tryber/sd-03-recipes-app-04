import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { getMealById } from '../services/foodApi';

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

  function copyContent(text) {
    const separetedText = text.split('/');
    const modifiedText = `${separetedText[0]}//${separetedText[2]}/${separetedText[4]}/${separetedText[5]}`;
    navigator.clipboard.writeText(modifiedText)
      .then(() => {
        setShowCopyAlert(true);
        alert(modifiedText);
        alert('Link copiado!');
        alert('Link copiado!');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function mountRecipeList(quantityPar, ingredientsPar) {
    quantityPar.map((e, i) => (inProgressRecipe[e] !== null && inProgressRecipe[e] !== ''
      ? ingredientsDoneList.push({
        meal: inProgressRecipe[e],
        mensure: inProgressRecipe[ingredientsPar[i]],
        checked: checked.checkbox[i],
      })
      : null
    ));

    return ingredientsDoneList;
  }

  const data = mountRecipeList(quantity, ingredients);
  const buttonEnabled = countChecked === data.length;
  const { location, history } = props;
  const { pathname } = location;
  return (
    <RenderRecipesInProgressMeals values={{
      data,
      buttonEnabled,
      inProgressRecipe,
      showCopyAlert,
      copyContent,
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
  pathname: PropTypes.string.isRequired,
  history: PropTypes.string.isRequired,
};

export default ProgressFoodScreen;
