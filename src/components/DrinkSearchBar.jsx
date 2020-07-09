import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import * as api from '../services/drink-api';

function checkResults(data, setResult, setGoToRoute, setId) {
  if (data === undefined || data.drinks === null) {
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  } else if (data.drinks.length === 1) {
    setId(data.drinks[0].idDrink);
    setGoToRoute(true);
  } else if (data.drinks.length > 1) {
    setResult(data.drinks);
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
          data-testid="name-search-radio"
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
          data-testid="first-letter-search-radio"
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
      api.getDrinksByIngredient(searchedItem)
        .then((data) => checkResults(data, setResult, setGoToRoute, setId));
      break;
    }
    case 'name': {
      api.getDrinksByName(searchedItem)
        .then((data) => checkResults(data, setResult, setGoToRoute, setId));
      break;
    }
    default: {
      if (searchedItem.length > 1) { alert('Sua busca deve conter somente 1 (um) caracter'); }
      if (searchedItem.length === 1) {
        api.getDrinksByLetter(searchedItem)
          .then((data) => checkResults(data, setResult, setGoToRoute, setId));
      }
    }
  }
}

function DrinkSearchBar() {
  const [searchedItem, setSearchedItem] = useState('');
  const [searchBy, setSearchBy] = useState('');
  const [result, setResult] = useState([]);
  const [goToRoute, setGoToRoute] = useState(false);
  const [id, setId] = useState('');
  const [disabled, setDisabled] = useState('true');

  return (
    <div className="search-area slide-in-top">
      <input
        data-testid="search-input"
        id="searched-item"
        type="text"
        onChange={(e) => setSearchedItem(e.target.value)}
        value={searchedItem}
        placeholder="Buscar"
      />
      {renderRadioButtons(setSearchBy, setDisabled)}
      <button
        data-testid="exec-search-btn"
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
              <Link to={`/bebidas/${e.idDrink}`}>
                <div className={`product-pic product-pic-${i}`} data-testid={`${i}-recipe-card`} key={e.idDrink}>
                  <img src={e.strDrinkThumb} className="recipe-image" data-testid={`${i}-card-img`} alt="thumbnail" width="150px" />
                  <h5 data-testid={`${i}-card-name`}>{(e.strDrink.length > 30) ? `${e.strDrink.slice(0, 30)}...` : e.strDrink}</h5>
                </div>
              </Link>,
            ];
          }
          return arr;
        }, [])}
      </div>
      {goToRoute && <Redirect to={`/bebidas/${id}`} />}
    </div>
  );
}

export default DrinkSearchBar;
