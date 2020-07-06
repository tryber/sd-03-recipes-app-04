import React, { useState, useEffect } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';

import profileIcon from '../images/profileIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import '../components/CSS/DoneRecipes.css';

const header = () => (
  <div className="header-recipes-done">
    <img
      src={profileIcon}
      alt="ProfileIcon"
      data-testeid="profile-top-btn"
    />
    <p>Receitas Feitas</p>
  </div>
);

const buttons = (setRecipes, state) => {
  const food = state.filter((e) => e.type === 'comida');
  const drinck = state.filter((e) => e.type === 'bebida');
  return (
    <div className="test">
      <button
        type="button"
        className="buttons-filter"
        data-testid="filter-by-all-btn"
        onClick={() => setRecipes(state)}
      >
        All
      </button>
      <button
        type="button"
        className="buttons-filter"
        data-testid="filter-by-food-btn"
        onClick={() => setRecipes(food)}
      >
        Food
      </button>
      <button
        type="button"
        className="buttons-filter"
        data-testid="filter-by-drink-btn"
        onClick={() => setRecipes(drinck)}
      >
        Drinks
      </button>
    </div>
  );
};

function renderRecipes(recipes) {
  console.log(recipes);
  return (
    <div>
      {recipes.map(({
        image,
        id,
        name,
        category,
        type,
      }) => {
        return (
          <div className="recipes-done" key={id}>
            <Link to={`${type}s/${id}`}>
              <img
                data-testid={`${id}-horizontal-image`}
                src={image}
                alt="Imagem da Receita Finalizada"
                width="150px"
              />
            </Link>
            <p data-testid={`${id}-horizontal-top-text`}>{category}</p>
            <Link to={`${type}s/${id}`} data-testid={`${id}-horizontal-name`}>{name}</Link>
            <p data-testid={`${id}-horizontal-done-date`}>{id}</p>
            <p data-testid={`${id}-${name}-horizontal-tag`}>{category}</p>
            <CopyToClipboard text={navigator.clipboard.writeText(window.location.href)}>
              <button
                className="share"
                type="button"
                data-testid="filter-by-drink-btn"
                onClick={() => alert('Link copiado!')}
              >
                <img src={shareIcon} alt="icon" />
              </button>
            </CopyToClipboard>
          </div>
        );
      })}
    </div>
  );
}

function DoneRecipes() {
  const [recipes, setRecipes] = useState(JSON.parse(localStorage.getItem('doneRecipes')));
  const state = JSON.parse(localStorage.getItem('doneRecipes'));
  useEffect(() => {
    renderRecipes(recipes);
  }, [recipes]);
  return (
    <div className="container">
      {header()}
      {buttons(setRecipes, state)}
      {recipes && renderRecipes(recipes)}
    </div>
  );
}

export default DoneRecipes;
