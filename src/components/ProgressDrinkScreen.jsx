import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getDrinkByID } from '../services/drink-api';
import { mountRecipeList, getIfHasBeenFavorited } from './functionsProgressScreen';
import checkedlist, { checkedList } from './checklist';
import CockTailsRenderRecipesInProgress from './helpersComponents/CockTailsRenderRecipesInProgress';

function getLocalStorage(id) {
  let checkLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));

  if (checkLocalStorage === null) {
    checkLocalStorage = { meals: [], cocktails: [] };
  }

  let arr;

  if (checkLocalStorage.cocktails[id] === undefined) {
    arr = checkedList.checkbox;
    const newStorage = {
      ...checkLocalStorage,
      cocktails: { ...checkLocalStorage.cocktails, [id]: arr },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
    checkLocalStorage = newStorage;
  } else {
    arr = checkLocalStorage.cocktails[id];
    const newStorage = {
      ...checkLocalStorage,
      cocktails: { ...checkLocalStorage.cocktails, [id]: arr },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
    checkLocalStorage = newStorage;
  }

  return checkLocalStorage;
}
function ProgressDrinkScreen(props) {
  const [inProgressDrink, setInProgressDrink] = useState([]);
  const [showCopyAlert, setShowCopyAlert] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [countChecked, setCountChecked] = useState(0);
  const [checked, setChecked] = useState(checkedlist);

  const ingredientsDoneList = [];

  const { match: { params: { id } } } = props;

  const checkLocalStorage = getLocalStorage(id);

  useEffect(() => {
    getDrinkByID(id).then((data) => {
      setInProgressDrink(data.drinks[0]);
    });
    if (getIfHasBeenFavorited(id)) { setIsFavorite(true); }
  }, [id, checkLocalStorage, checked, countChecked]);

  const data = mountRecipeList(inProgressDrink, checked, ingredientsDoneList);
  const buttonEnabled = countChecked === data.length;
  const { location, history } = props;
  const { pathname } = location;

  return (
    <CockTailsRenderRecipesInProgress
      values={{
        data,
        buttonEnabled,
        inProgressDrink,
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
        pathname,
        history,
      }}
    />
  );
}
ProgressDrinkScreen.propTypes = {
  match: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  history: PropTypes.string.isRequired,
};

export default ProgressDrinkScreen;
