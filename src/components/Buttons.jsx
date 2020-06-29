import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import CopyToClipboard from 'react-copy-to-clipboard';
import { InfoContext } from './DetailsFoodScreen';
import share from '../images/shareIcon.svg';
import notFavorite from '../images/whiteHeartIcon.svg';
import favorite from '../images/blackHeartIcon.svg';

function changeRecipeStatus(setHasStarted, recipeInfo, hasStarted, setGoToRoute) {
  setGoToRoute(true);
  setHasStarted(true);
  const {
    idMeal, strType, strArea, strCategory, strMeal, strMealThumb,
  } = recipeInfo;
  const mealInfo = {
    id: idMeal,
    type: strType,
    area: strArea.strArea,
    category: strCategory,
    alcoholicOrNor: undefined,
    name: strMeal,
    image: strMealThumb,
    doneDate: undefined,
    tags: undefined,
  };
  if (!hasStarted) {
    let storage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (!storage) {
      storage = [];
    }
    const newStorage = [...storage, mealInfo];
    localStorage.setItem('doneRecipes', JSON.stringify(newStorage));
  }
}

function getLocalStorage(id) {
  const storage = JSON.parse(localStorage.getItem('doneRecipes'));
  let started;
  let done;
  if (!storage) {
    started = false;
  } else {
    started = storage.find((e) => e.id === id);
    done = storage.find((e) => e.doneDate !== undefined);
  }
  const status = { started, done };
  return status;
}

function clickFavorite(setIsFavorite, recipeInfo, isfavorite) {
  setIsFavorite((isFavorite) => !isFavorite);
  const {
    idMeal, strType, strArea, strCategory, strMeal, strMealThumb,
  } = recipeInfo;
  const mealInfo = {
    id: idMeal,
    type: strType,
    area: strArea,
    category: strCategory,
    alcoholicOrNor: undefined,
    name: strMeal,
    image: strMealThumb,
  };
  if (!isfavorite) {
    let storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!storage) {
      storage = [];
    }
    const newStorage = [...storage, mealInfo];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
  }
  if (isfavorite) {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newStorage = storage.filter((e) => !e.id === idMeal);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
  }
}

function Buttons() {
  const [hasStarted, setHasStarted] = useState(false);
  const [goToRoute, setGoToRoute] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { recipeInfo, id } = useContext(InfoContext);

  return (
    <div className="bottom-buttons">
      {!hasStarted && !getLocalStorage(id).done && !getLocalStorage(id).started && (
        <button
          type="button"
          onClick={() => changeRecipeStatus(setHasStarted,
            recipeInfo, hasStarted, setGoToRoute)}
          className="start-button"
        >
          Iniciar Receita
        </button>
      )}
      {getLocalStorage(id).started && !getLocalStorage(id).done && (
        <button
          type="button"
          className="start-button"
        >
          Continuar Receita
        </button>
      )}
      <div className="share-and-favourite">
        <button
          type="button"
          className="favourite"
          onClick={() => clickFavorite(setIsFavorite, recipeInfo, isFavorite)}
        >
          {isFavorite ? <img src={favorite} alt="favorite" />
            : <img src={notFavorite} alt="favorite" />}
        </button>
        <CopyToClipboard text={window.location.href}>
          <button
            type="button"
            onClick={() => alert('Copiado')}
            className="favourite"
          >
            <img src={share} alt="icon" />
          </button>
        </CopyToClipboard>
        {goToRoute && <Redirect to={`/comidas/${id}/in-progress`} />}
      </div>
    </div>
  );
}

export default Buttons;
