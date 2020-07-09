import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CSS/FavoriteRecipes.css';
import favorite from '../images/blackHeartIcon.svg';
import share from '../images/shareIcon.svg';
import Header from './Header';
import meal from '../images/meal.svg';
import drink from '../images/drink.svg';
import filter from '../images/filter.svg';

const colors = ['#DFBC41', '#e7736a', '#FCF7C9', '#C9DA73', '#D3A585', '#FAC55E', '#FBF8D7', '#63c252', '#C79B7E', '#F9F5BF', '#C67206', '#3EC1D6'];

function copyToClipboard(type, id, setHide) {
  navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`)
    .then(() => {
      setHide(false);
      setTimeout(() => {
        setHide(true);
      }, 2000);
    });
}

export function getColors() {
  const color = Math.floor(Math.random() * 12);
  return colors[color];
}

function updateStorage(id, setFavorites) {
  const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const newStorage = storage.filter((e) => e.id !== id);
  localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
  setFavorites(newStorage);
}

function filterBy(setFavorites, type) {
  let storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (!storage) { storage = []; }
  setFavorites(storage.filter((e) => e.type === type));
}

function getFavorites(setFavorites) {
  let storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (!storage) { storage = []; }
  setFavorites(storage);
}

function renderfilterButtons(setFavorites) {
  return (
    <div className="favorite-filter-buttons">
      <button
        className="button-main-screen"
        data-testid="filter-by-food-btn"
        onClick={() => filterBy(setFavorites, 'comida')}
        type="button"
      >
        <img src={meal} alt="meal" width="30px" />
        Food
      </button>
      <button
        className="button-main-screen"
        data-testid="filter-by-drink-btn"
        onClick={() => filterBy(setFavorites, 'bebida')}
        type="button"
      >
        <img src={drink} alt="drink" width="30px" />
        Drinks
      </button>
      <button
        className="button-main-screen"
        data-testid="filter-by-all-btn"
        onClick={() => getFavorites(setFavorites)}
        type="button"
      >
        <img src={filter} alt="filter" width="20px" />
        All
      </button>
    </div>
  );
}

function FavoriteRecipes() {
  const [favorites, setFavorites] = useState([]);
  const [hide, setHide] = useState(true);
  useEffect(() => {
    getFavorites(setFavorites);
  }, []);
  return (
    <div>
      <Header screen="Receitas Favoritas" />
      <div className="favorite-recipes-screen">
        <p className="alert-favorite-screen" hidden={hide}>Link copiado!</p>
        {renderfilterButtons(setFavorites)}
        <div className="favorite-recipes-container">
          {favorites.map((e, i) => (
            (
              <div className="favorite-recipes-card" style={{ backgroundColor: getColors() }}>
                <Link to={`/${e.type}s/${e.id}`}><img data-testid={`${i}-horizontal-image`} src={e.image} alt="favorite" width="150px" /></Link>
                <Link to={`/${e.type}s/${e.id}`}><p data-testid={`${i}-horizontal-name`}>{e.name}</p></Link>
                <div data-testid={`${i}-horizontal-top-text`}>
                  {(e.alcoholicOrNot === '') ? <p>{`${e.area} - ${e.category}`}</p> : <p>{e.alcoholicOrNot}</p>}
                </div>
                <div className="favorite-and-share">
                  <button
                    type="button"
                    onClick={() => copyToClipboard(e.type, e.id, setHide)}
                  >
                    <img data-testid={`${i}-horizontal-share-btn`} src={share} alt="share" />
                  </button>
                  <button
                    onClick={() => updateStorage(e.id, setFavorites)}
                    type="button"
                  >
                    <img data-testid={`${i}-horizontal-favorite-btn`} src={favorite} alt="favorite" />
                  </button>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
}

export default FavoriteRecipes;
