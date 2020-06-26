import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import * as api from '../services/foodApi';

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
      <label htmlFor="ingrediente">
        <input
          id="ingredient"
          type="radio"
          name="search"
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
    <div>
      <input
        id="searched-item"
        type="text"
        onChange={(e) => setSearchedItem(e.target.value)}
        value={searchedItem}
      />
      {renderRadioButtons(setSearchBy, setDisabled)}
      <button
        onClick={() => doSearch(searchBy, searchedItem, setResult, setGoToRoute, setId)}
        className="search-button"
        type="button"
        disabled={disabled}
      >
        Buscar
      </button>
      <div className="recipes-results">
        {result.reduce((arr, e, i) => {
          if (i < 12) {
            return [...arr,
            <div className="product-pic">
              <img src={e.strMealThumb} alt="thumbnail" width="150px" />
              <h5>{e.strMeal}</h5>
            </div>,
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
