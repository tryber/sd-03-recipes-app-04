import React, { useState, useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import CopyToClipboard from 'react-copy-to-clipboard';
import { DrinkContext } from './DetailsDrinkScreen';
import share from '../images/shareIcon.svg';
import notFavorite from '../images/whiteHeartIcon.svg';
import favorite from '../images/blackHeartIcon.svg';
import { getDoneLocalStorage, getStartedLocalStorage, getIfHasBeenFavorited } from './FoodButtons';

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
  const [goToRoute, setGoToRoute] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { recipeInfo, id } = useContext(DrinkContext);
  useEffect(() => {
    if (getIfHasBeenFavorited(id)) { setIsFavorite(true); }
  }, [id]);

  return (
    <div className="bottom-buttons">
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
      <div className="share-and-favourite">
        {renderShareAndFavoriteButtons(setIsFavorite, recipeInfo, isFavorite, goToRoute, id)}
      </div>
      {goToRoute && <Redirect to={`/bebidas/${id}/in-progress`} />}
    </div>
  );
}

export default Buttons;
