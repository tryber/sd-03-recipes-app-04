import React, { useState, useEffect } from 'react';
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
  recipes.map(({
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
    <div className="recipes-done" key={name}>
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
      {tags.map((tag) => (
        <p key={tag} data-testid={`${idxMap}-${tag}-horizontal-tag`}>{`${tag}`}</p>
      ))}
      <button
        type="button"
        data-testid={`${idxMap}-horizontal-share-btn`}
        onClick={() => clipboard(type, id, setClp)}
        src={shareIcon}
      >
        <img src={shareIcon} alt="icon" />
      </button>
    </div>
  ))
);

const DoneRecipes = () => {
  const [recipes, setRecipes] = useState(JSON.parse(localStorage.getItem('doneRecipes')));
  const state = JSON.parse(localStorage.getItem('doneRecipes'));
  const [clp, setClp] = useState(true);

  useEffect(() => {
    renderRecipes(recipes);
  }, [recipes]);

  return (
    <div className="container">
      {state && header()}
      {state && buttons(setRecipes, state)}
      {recipes && renderRecipes(recipes, setClp)}
      <p className="alert" hidden={clp}>Link copiado!</p>
    </div>
  );
};

export default DoneRecipes;
