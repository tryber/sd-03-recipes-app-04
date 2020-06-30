import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { getFirstMeals, getByIgredient } from '../services/foodApi';
import { getFirstDrinks, getDrinksByIngredient } from '../services/drink-api';

export const ContextAplication = createContext();

const user = { email: '', password: '' };

const AplicationProvider = ({ children }) => {
  const [informationsUser, setInformationsUser] = useState(user);
  const [searchInputVisible, setSearchInputVisible] = useState(false);
  const [Data, setData] = useState([]);
  const [ingredientFilter, setingredientFilter] = useState('');

  const saveInput = (input) => {
    const inputsLogin = {
      email: input.email,
      password: input.password,
    };
    setInformationsUser(inputsLogin);
  };

  const searchInput = () => {
    setSearchInputVisible(!searchInputVisible);
  };

  const getMeals = () => {
    if (ingredientFilter === '') {
      getFirstMeals()
        .then((answer) => setData(answer.meals));
    } else {
      getByIgredient(ingredientFilter)
        .then((answer) => setData(answer.meals));
    }
  };

  const getDrinks = () => {
    if (ingredientFilter === '') {
      getFirstDrinks()
      .then((answer) => setData(answer.drinks));
    } else {
      getDrinksByIngredient(ingredientFilter)
        .then((answer) => setData(answer.drinks));
    }
  }

  const updateMeals = (answer) => {
    setData(answer);
  };

  const updateDrinks = (answer) => {
    setData(answer);
  };

  const changeIngredientFilter = (ingredient) => {
    setingredientFilter(ingredient);
  }

  const context = {
    informationsUser,
    saveInput,
    searchInputVisible,
    searchInput,
    Data,
    getMeals,
    updateMeals,
    ingredientFilter,
    changeIngredientFilter,
    getDrinks,
    updateDrinks,
  };

  return (
    <ContextAplication.Provider value={context}>
      {children}
    </ContextAplication.Provider>
  );
};

AplicationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AplicationProvider;
