import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { getFirstMeals, getMealById, getByIgredient } from '../services/foodApi';
import { getFirstDrinks, getDrinksByIngredient, getDrinkByID } from '../services/drink-api';

export const ContextAplication = createContext();

const user = { email: '', password: '' };

const AplicationProvider = ({ children }) => {
  const [informationsUser, setInformationsUser] = useState(user);
  const [searchInputVisible, setSearchInputVisible] = useState(false);
  const [Data, setData] = useState([]);
  const [recipeInfo, setRecipeInfo] = useState([]);
  const [id, setId] = useState('');
  const [recomendation, setRecomendation] = useState([]);
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
    switch (ingredientFilter) {
      case '':
        getFirstMeals()
          .then((answer) => setData(answer.meals));
        break;
      default:
        getByIgredient(ingredientFilter)
          .then((answer) => setData(answer.meals));
    }
  };

  const getDrinks = () => {
    switch (ingredientFilter) {
      case '':
        getFirstDrinks()
          .then((answer) => setData(answer.drinks));
        break;
      default:
        getDrinksByIngredient(ingredientFilter)
          .then((answer) => setData(answer.drinks));
    }
  };

  const getFoodScreenInfos = (foodId) => {
    setId(foodId);
    getMealById(foodId).then((data) => {
      setRecipeInfo(data.meals[0]);
    });
    getFirstDrinks().then((data) => setRecomendation(data.drinks));
  };

  const getDrinkScreenInfos = (drinkId) => {
    setId(drinkId);
    getDrinkByID(drinkId).then((data) => {
      setRecipeInfo(data.drinks[0]);
    });
    getFirstMeals().then((data) => setRecomendation(data.meals));
  };

  const context = {
    informationsUser,
    saveInput,
    searchInputVisible,
    searchInput,
    Data,
    getMeals,
    getFoodScreenInfos,
    getDrinkScreenInfos,
    recipeInfo,
    recomendation,
    id,
    ingredientFilter,
    getDrinks,
    setData,
    setingredientFilter,
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
