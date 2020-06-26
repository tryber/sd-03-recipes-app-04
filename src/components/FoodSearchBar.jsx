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

function renderRadioButtons(setSearchBy) {
  return (
    <div className="radio-buttons">
      <label htmlFor="ingrediente">
        <input
          id="ingredient"
          type="radio"
          name="search"
          onChange={(e) => setSearchBy(e.target.id)}
        />
        Ingrediente
      </label>
      <label htmlFor="name">
        <input
          id="name"
          type="radio"
          name="search"
          onChange={(e) => setSearchBy(e.target.id)}
        />
        Nome
      </label>
      <label htmlFor="first-letter">
        <input
          id="first-letter"
          type="radio"
          name="search"
          onChange={(e) => setSearchBy(e.target.id)}
        />
        Primeira Letra
      </label>
    </div>
  );
}

function doSearch(searchBy, searchedItem, setResult, setGoToRoute, setId) {
  if (searchBy) {
    if (searchBy === 'ingredient') {
      api.getByIgredient(searchedItem)
        .then((data) => checkResults(data, setResult, setGoToRoute, setId));
    } else if (searchBy === 'name') {
      api.getMealByName(searchedItem)
        .then((data) => checkResults(data, setResult, setGoToRoute, setId));
    } else if (searchBy === 'first-letter') {
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

  return (
    <div>
      <input
        id="searched-item"
        type="text"
        onChange={(e) => setSearchedItem(e.target.value)}
        value={searchedItem}
      />
      {renderRadioButtons(setSearchBy)}
      <button
        onClick={() => doSearch(searchBy, searchedItem, setResult, setGoToRoute, setId)}
        className="search-button"
        type="button"
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
