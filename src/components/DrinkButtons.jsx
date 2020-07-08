import React, { useState, useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import share from '../images/shareIcon.svg';
import notFavorite from '../images/whiteHeartIcon.svg';
import favorite from '../images/blackHeartIcon.svg';
import {
  getDoneLocalStorage,
  getIfHasBeenFavorited,
  copyToClipboard,
} from './FoodButtons';
import { ContextAplication } from '../context/ContextAplication';

function clickFavorite(setIsFavorite, recipeInfo, isFavorite) {
  setIsFavorite((fav) => !fav);
  const {
    idDrink, strDrink, strDrinkThumb, strAlcoholic, strCategory,
  } = recipeInfo;
  const drinkInfo = {
    id: idDrink,
    type: 'bebida',
    area: '',
    category: strCategory,
    alcoholicOrNot: strAlcoholic,
    name: strDrink,
    image: strDrinkThumb,
  };
  let storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (!storage) {
    storage = [];
  }
  if (!isFavorite) {
    const newStorage = [...storage, drinkInfo];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
  }
  if (isFavorite) {
    const newStorage = storage.filter((e) => e.id !== idDrink);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
  }
}

function getStartedLocalStorage(id) {
  const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  let started;
  if (!storage || storage.cocktails === undefined) {
    started = false;
  } else {
    started = Object.keys(storage.cocktails).find((e) => e === id);
  }
  return started;
}

function renderFavoriteButton(setIsFavorite, recipeInfo, isFavorite, goToRoute, id) {
  return (
    <div className="share-and-favourite">
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
      {goToRoute && <Redirect to={`/bebidas/${id}/in-progress`} />}
    </div>
  );
}

function renderShareButton(setHide) {
  return (
    <div className="share-and-favourite">
      <button
        type="button"
        onClick={() => copyToClipboard(setHide)}
        className="favourite"
      >
        <img data-testid="share-btn" src={share} alt="icon" />
      </button>
    </div>
  );
}

function Buttons() {
  const [goToRoute, setGoToRoute] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [hide, setHide] = useState(true);
  const { recipeInfo, id } = useContext(ContextAplication);
  useEffect(() => {
    if (getIfHasBeenFavorited(id)) { setIsFavorite(true); }
  }, [id]);
  return (
    <div className="bottom-buttons">
      {renderFavoriteButton(setIsFavorite, recipeInfo, isFavorite, goToRoute, id)}
      {!getDoneLocalStorage(id) && !getStartedLocalStorage(id) && (
        <button
          data-testid="start-recipe-btn"
          type="button"
          onClick={() => setGoToRoute(true)}
          className="start-button"
        >
          Iniciar Receita
        </button>
      )}
      {getStartedLocalStorage(id) && !getDoneLocalStorage(id) && (
        <button
          type="button"
          className="start-button"
          data-testid="start-recipe-btn"
          onClick={() => setGoToRoute(true)}
        >
          Continuar Receita
        </button>
      )}
      {renderShareButton(setHide)}
      <p className="alert" hidden={hide}>Link copiado!</p>
      {goToRoute && <Redirect to={`/bebidas/${id}/in-progress`} />}
    </div>
  );
}

export default Buttons;
