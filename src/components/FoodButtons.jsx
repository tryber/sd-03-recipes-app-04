import React, { useState, useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import CopyToClipboard from 'react-copy-to-clipboard';
import share from '../images/shareIcon.svg';
import notFavorite from '../images/whiteHeartIcon.svg';
import favorite from '../images/blackHeartIcon.svg';
import { ContextAplication } from '../context/ContextAplication';

export function getDoneLocalStorage(id) {
  const storage = JSON.parse(localStorage.getItem('doneRecipes'));
  let done;
  if (!storage) {
    done = false;
  } else {
    done = storage.find((e) => e.id !== id);
  }
  return done;
}

export function getStartedLocalStorage(id) {
  const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  let started;
  if (!storage) {
    started = false;
  } else {
    started = Object.keys(storage).find((e) => e === id);
  }
  return started;
}

export function getIfHasBeenFavorited(id) {
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
      {goToRoute && <Redirect to={`/comidas/${id}/in-progress`} />}
    </div>
  );
}

function renderShareButton() {
  return (
    <div className="share-and-favourite">
      <CopyToClipboard text={navigator.clipboard.writeText(window.location.href)}>
        <button
          type="button"
          onClick={() => alert('Link copiado!')}
          className="favourite"
        >
          <img data-testid="share-btn" src={share} alt="icon" />
        </button>
      </CopyToClipboard>
    </div>
  );
}

function Buttons() {
  const [goToRoute, setGoToRoute] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
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
      {renderShareButton()}
      {goToRoute && <Redirect to={`/comidas/${id}/in-progress`} />}
    </div>
  );
}

export default Buttons;
