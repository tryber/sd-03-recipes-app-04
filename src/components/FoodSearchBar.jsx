import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import * as api from '../services/foodApi';
import './CSS/SearchBar.css';

function checkResults(data, setResult, setGoToRoute, setId) {
  if (data.meals === null) {
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  } else if (data.meals.length === 1) {
    setId(data.meals[0].idMeal);
    setGoToRoute(true);
  } else if (data.meals.length > 1) {
    setResult(data.meals);
  }
}

function renderRadioButtons(setSearchBy, setDisabled) {
  return (
    <div className="radio-buttons">
      <label htmlFor="ingredient">
        <input
          id="ingredient"
          type="radio"
          name="search"
          data-testid="ingredient-search-radio"
          onChange={(e) => {
            setSearchBy(e.target.id);
            setDisabled(false);
          }}
        />
        Ingrediente
      </label>
      <label htmlFor="name">
        <input
          id="name"
          type="radio"
          name="search"
          data-testid="name-search-radio"
          onChange={(e) => {
            setSearchBy(e.target.id);
            setDisabled(false);
          }}
        />
        Nome
      </label>
      <label htmlFor="first-letter">
        <input
          id="first-letter"
          type="radio"
          name="search"
          data-testid="first-letter-search-radio"
          onChange={(e) => {
            setSearchBy(e.target.id);
            setDisabled(false);
          }}
        />
        Primeira Letra
      </label>
    </div>
  );
}

function doSearch(searchBy, searchedItem, setResult, setGoToRoute, setId) {
  switch (searchBy) {
    case 'ingredient': {
      api.getByIgredient(searchedItem)
        .then((data) => checkResults(data, setResult, setGoToRoute, setId));
      break;
    }
    case 'name': {
      api.getMealByName(searchedItem)
        .then((data) => checkResults(data, setResult, setGoToRoute, setId));
      break;
    }
    default: {
      if (searchedItem.length > 1) { alert('Sua busca deve conter somente 1 (um) caracter'); }
      if (searchedItem.length === 1) {
        api.getByFirstLetter(searchedItem)
          .then((data) => checkResults(data, setResult, setGoToRoute, setId));
      }
    }
  }
}

function FoodSearchBar() {
  const [searchedItem, setSearchedItem] = useState('');
  const [searchBy, setSearchBy] = useState('');
  const [result, setResult] = useState([]);
  const [goToRoute, setGoToRoute] = useState(false);
  const [id, setId] = useState('');
  const [disabled, setDisabled] = useState(true);

  return (
    <div className="search-area slide-in-top">
      <input
        id="searched-item"
        className="searched-item"
        type="text"
        placeholder="Buscar"
        onChange={(e) => setSearchedItem(e.target.value)}
        value={searchedItem}
        data-testid="search-input"
      />
      {renderRadioButtons(setSearchBy, setDisabled)}
      <button
        onClick={() => doSearch(searchBy, searchedItem, setResult, setGoToRoute, setId)}
        className="search-button"
        type="button"
        data-testid="exec-search-btn"
        disabled={disabled}
      >
        Buscar
      </button>
      <div className="recipes-results">
        {result.reduce((arr, e, i) => {
          if (i < 12) {
            return [...arr,
              <Link to={`/comidas/${e.idMeal}`} key={e.idMeal}>
                <div className={`product-pic product-pic-${i}`} data-testid={`${i}-recipe-card`}>
                  <img data-testid={`${i}-card-img`} className="recipe-image" src={e.strMealThumb} alt="thumbnail" width="120px" />
                  <h5 data-testid={`${i}-card-name`}>{(e.strMeal.length > 30) ? `${e.strMeal.slice(0, 30)}...` : e.strMeal }</h5>
                </div>
              </Link>,
            ];
          }
          return arr;
        }, [])}
      </div>
      {goToRoute && <Redirect to={`/comidas/${id}`} />}
    </div>
  );
}

export default FoodSearchBar;
