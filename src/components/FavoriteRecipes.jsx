import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CopyToClipboard from 'react-copy-to-clipboard';
import './CSS/FavoriteRecipes.css';
import favorite from '../images/blackHeartIcon.svg';
import share from '../images/shareIcon.svg';

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

function FavoriteRecipes() {
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    getFavorites(setFavorites);
  }, []);
  return (
    <div>
      <div>
        <button onClick={() => filterBy(setFavorites, 'comida')} type="button">Food</button>
        <button onClick={() => filterBy(setFavorites, 'bebida')} type="button">Drinks</button>
        <button onClick={() => getFavorites(setFavorites)} type="button">All</button>
      </div>
      <div className="favorite-recipes-container">
        {favorites.map((e) => (
          (
            <div className="favorite-recipes-card">
              <Link to={`/${e.type}s/${e.id}`}><img src={e.image} alt="favorite" width="150px" /></Link>
              <Link to={`/${e.type}s/${e.id}`}><p>{e.name}</p></Link>
              {(e.alcoholicOrNot === '') ? <p>{e.category}</p> : <p>{e.alcoholicOrNot}</p>}
              {(e.alcoholicOrNot === '') && <p>{e.area}</p>}
              <CopyToClipboard text={`http://localhost:3000/comidas/${e.id}`}>
                <button type="button" onClick={() => alert('Link copiado!')}><img src={share} alt="share" /></button>
              </CopyToClipboard>
              <button onClick={() => updateStorage(e.id, setFavorites)} type="button"><img src={favorite} alt="favorite" /></button>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

export default FavoriteRecipes;
