import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CopyToClipboard from 'react-copy-to-clipboard';
import './CSS/FavoriteRecipes.css';
import favorite from '../images/blackHeartIcon.svg';
import share from '../images/shareIcon.svg';
import Header from './Header';

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
        data-testid="filter-by-food-btn"
        onClick={() => filterBy(setFavorites, 'comida')}
        type="button"
      >
        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={() => filterBy(setFavorites, 'bebida')}
        type="button"
      >
        Drinks
      </button>
      <button
        data-testid="filter-by-all-btn"
        onClick={() => getFavorites(setFavorites)}
        type="button"
      >
        All
      </button>
    </div>
  );
}

function FavoriteRecipes() {
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    getFavorites(setFavorites);
  }, []);
  return (
    <div>
      <Header screen="Receitas Favoritas" />
      {renderfilterButtons(setFavorites)}
      <div className="favorite-recipes-container">
        {favorites.map((e, i) => (
          (
            <div className="favorite-recipes-card">
              <Link to={`/${e.type}s/${e.id}`}><img data-testid={`${i}-horizontal-image`} src={e.image} alt="favorite" width="150px" /></Link>
              <Link to={`/${e.type}s/${e.id}`}><p data-testid={`${i}-horizontal-name`}>{e.name}</p></Link>
              <div data-testid={`${i}-horizontal-top-text`}>
                {(e.alcoholicOrNot === '') ? <p>{`${e.area} - ${e.category}`}</p> : <p>{e.alcoholicOrNot}</p>}
              </div>
              <CopyToClipboard text={`http://localhost:3000/${e.type}s/${e.id}`}>
                <button
                  type="button"
                  onClick={() => alert('Link copiado!')}
                >
                  <img data-testid={`${i}-horizontal-share-btn`} src={share} alt="share" />
                </button>
              </CopyToClipboard>
              <button
                onClick={() => updateStorage(e.id, setFavorites)}
                type="button"
              >
                <img data-testid={`${i}-horizontal-favorite-btn`} src={favorite} alt="favorite" />
              </button>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

export default FavoriteRecipes;
