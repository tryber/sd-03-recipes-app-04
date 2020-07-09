import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import shareIcon from '../images/shareIcon.svg';
import { getColors } from './FavoriteRecipes';
import './CSS/DoneRecipes.css';
import meal from '../images/meal.svg';
import drink from '../images/drink.svg';
import filter from '../images/filter.svg';

const buttons = (setRecipes, state) => {
  const food = state.filter((e) => e.type === 'comida');
  const drinck = state.filter((e) => e.type === 'bebida');
  return (
    <div className="favorite-filter-buttons">
      <button
        type="button"
        className="button-main-screen"
        data-testid="filter-by-all-btn"
        onClick={() => setRecipes(state)}
      >
        <img src={filter} width="20px" alt="" />
        All
      </button>
      <button
        type="button"
        className="button-main-screen"
        data-testid="filter-by-food-btn"
        onClick={() => setRecipes(food)}
      >
        <img src={meal} width="20px" alt="" />
        Food
      </button>
      <button
        type="button"
        className="button-main-screen"
        data-testid="filter-by-drink-btn"
        onClick={() => setRecipes(drinck)}
      >
        <img src={drink} width="20px" alt="" />
        Drinks
      </button>
    </div>
  );
};

const clipboard = (type, id, setClp) => {
  navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`)
    .then(() => {
      setClp(false);
      setTimeout(() => {
        setClp(true);
      }, 2000);
    });
};

const renderRecipes = (recipes, setClp) => (
  <div className="favorite-recipes-container">
    {recipes.map(({
      id,
      type,
      category,
      alcoholicOrNot,
      name,
      image,
      area,
      doneDate,
      tags,
    }, idxMap) => (
      <div className="done-recipes-card" key={name} style={{ backgroundColor: getColors() }}>
        <Link to={`${type}s/${id}`}>
          <img
            data-testid={`${idxMap}-horizontal-image`}
            src={image}
            alt="Imagem da Receita Finalizada"
            width="150px"
          />
        </Link>
        <p data-testid={`${idxMap}-horizontal-top-text`}>{`${area} - ${category}`}</p>
        {type === 'bebida'
          ? <p data-testid={`${idxMap}-horizontal-top-text`}>{alcoholicOrNot}</p>
          : null}
        <Link to={`${type}s/${id}`} data-testid={`${idxMap}-horizontal-name`}>{name}</Link>
        <p data-testid={`${idxMap}-horizontal-done-date`}>{doneDate}</p>
        <div className="tags">
          {tags.map((tag) => (
            <p key={tag} data-testid={`${idxMap}-${tag}-horizontal-tag`}>{`${tag}`}</p>
          ))}
        </div>
        <button
          className="share"
          type="button"
          data-testid={`${idxMap}-horizontal-share-btn`}
          onClick={() => clipboard(type, id, setClp)}
          src={shareIcon}
        >
          <img src={shareIcon} alt="icon" />
        </button>
      </div>
    ))}
  </div>
);

const DoneRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const state = JSON.parse(localStorage.getItem('doneRecipes'));
  const [clp, setClp] = useState(true);

  let storage = JSON.parse(localStorage.getItem('doneRecipes'));
  if (!storage) { storage = []; }

  useEffect(() => {
    renderRecipes(recipes);
    setRecipes(storage);
  }, []);

  return (
    <div className="favorite-recipes-screen">
      <Header screen="Receitas Feitas" />
      {state && buttons(setRecipes, state)}
      {recipes && renderRecipes(recipes, setClp)}
      <p className="alert" hidden={clp}>Link copiado!</p>
    </div>
  );
};

export default DoneRecipes;
