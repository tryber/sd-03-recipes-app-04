import React, { useState, useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import CopyToClipboard from 'react-copy-to-clipboard';
import { DrinkContext } from './DetailsDrinkScreen';
import share from '../images/shareIcon.svg';
import notFavorite from '../images/whiteHeartIcon.svg';
import favorite from '../images/blackHeartIcon.svg';
import { getLocalStorage, getIfHasBeenFavorited } from './FoodButtons';

function changeRecipeStatus(setHasStarted, recipeInfo, hasStarted, setGoToRoute) {
  setGoToRoute(true);
  setHasStarted(true);
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
    doneDate: undefined,
    tags: undefined,
  };
  if (!hasStarted) {
    let storage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (!storage) {
      storage = [];
    }
    const newStorage = [...storage, drinkInfo];
    localStorage.setItem('doneRecipes', JSON.stringify(newStorage));
  }
}

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
    const newStorage = storage.filter((e) => !e.id === idDrink);
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
      {goToRoute && <Redirect to={`/bebidas/${id}/in-progress`} />}
    </div>
  );
}

function Buttons() {
  const [hasStarted, setHasStarted] = useState(false);
  const [goToRoute, setGoToRoute] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { recipeInfo, id } = useContext(DrinkContext);
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
