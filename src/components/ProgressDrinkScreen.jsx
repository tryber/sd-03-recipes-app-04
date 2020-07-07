import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getDrinkByID } from '../services/drink-api';
import { mountRecipeList, getIfHasBeenFavorited } from './helpersComponents/CockTailsfunctionsProgressScreen';
import checkedlist from './checklist';
import CockTailsRenderRecipesInProgress from './helpersComponents/CockTailsRenderRecipesInProgress';

function ProgressDrinkScreen(props) {
  const [inProgressDrink, setInProgressDrink] = useState([]);
  const [showCopyAlert, setShowCopyAlert] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [countChecked, setCountChecked] = useState(0);
  const ingredientsDoneList = [];
  const checkLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const quant = Object.keys(inProgressDrink).filter((e) => e.includes('strIngredient'));
  const ingred = Object.keys(inProgressDrink).filter((e) => e.includes('strMeasure'));
  const { match } = props;
  const { params } = match;
  const { id } = params;
  const [checked, setChecked] = useState(checkedlist);

  useEffect(() => {
    getDrinkByID(id).then((data) => {
      console.log(data.drinks[0]);
      setInProgressDrink(data.drinks[0]);
    });
  }, []);

  useEffect(() => {
    if (getIfHasBeenFavorited(id)) { setIsFavorite(true); }
  }, [id]);

  useEffect(() => {
    if (checkLocalStorage === null) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({ cocktails: { [id]: checked.checkbox }, countChecked }));
    }
  }, [checkLocalStorage]);

  useEffect(() => {
  }, [checked, countChecked]);

  useEffect(() => {
    if (getIfHasBeenFavorited(id)) { setIsFavorite(true); }
  }, [id]);

  const data = mountRecipeList(quant, ingred, inProgressDrink, checked, ingredientsDoneList);
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
