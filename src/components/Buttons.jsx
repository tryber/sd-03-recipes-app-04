import React, { useState, useContext, useEffect } from 'react';
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
    idMeal, strArea, strCategory, strMeal, strMealThumb,
  } = recipeInfo;
  const mealInfo = {
    id: idMeal,
    type: 'comida',
    area: strArea.strArea,
    category: strCategory,
    alcoholicOrNot: '',
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

function getIfHasBeenFavorited(id) {
  const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (storage) {
    const favorited = storage.find((e) => e.id === id);
    return favorited;
  }
  return false;
}

function clickFavorite(setIsFavorite, recipeInfo, isFavorite) {
  setIsFavorite((fav) => !fav);
  const {
    idMeal, strArea, strCategory, strMeal, strMealThumb,
  } = recipeInfo;
  const mealInfo = {
    id: idMeal,
    type: 'comida',
    area: strArea,
    category: strCategory,
    alcoholicOrNot: '',
    name: strMeal,
    image: strMealThumb,
  };
  let storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (!storage) {
    storage = [];
  }
  if (!isFavorite) {
    const newStorage = [...storage, mealInfo];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
  }
  if (isFavorite) {
    const newStorage = storage.filter((e) => !e.id === idMeal);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
  }
}

function renderShareAndFavoriteButtons(setIsFavorite, recipeInfo, isFavorite, goToRoute, id) {
  return (
    <div>
      <button
        type="button"
        className="favourite"
        onClick={() => clickFavorite(setIsFavorite, recipeInfo, isFavorite)}
        src={favorite}
      >
        {getIfHasBeenFavorited(id)
          ? <img data-testid="favorite-btn" src={favorite} alt="favorite" />
          : <img data-testid="favorite-btn" src={notFavorite} alt="favorite" />}
      </button>
      <CopyToClipboard text={window.location.href}>
        <button
          type="button"
          onClick={() => alert('Link copiado!')}
          className="favourite"
        >
          <img data-testid="share-btn" src={share} alt="icon" />
        </button>
      </CopyToClipboard>
      {goToRoute && <Redirect to={`/comidas/${id}/in-progress`} />}
    </div>
  );
}

function Buttons() {
  const [hasStarted, setHasStarted] = useState(false);
  const [goToRoute, setGoToRoute] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { recipeInfo, id } = useContext(InfoContext);
  useEffect(() => {
    if (getIfHasBeenFavorited(id)) { setIsFavorite(true); }
  }, [id]);

  return (
    <div className="bottom-buttons">
      {!hasStarted && !getLocalStorage(id).done && !getLocalStorage(id).started && (
        <button
          data-testid="start-recipe-btn"
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
          data-testid="start-recipe-btn"
        >
          Continuar Receita
        </button>
      )}
      <div className="share-and-favourite">
        {renderShareAndFavoriteButtons(setIsFavorite, recipeInfo, isFavorite, goToRoute, id)}
      </div>
    </div>
  );
}

export default Buttons;
