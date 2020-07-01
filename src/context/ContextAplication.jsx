import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { getFirstMeals, getMealById } from '../services/foodApi';
import { getFirstDrinks } from '../services/drink-api';

export const ContextAplication = createContext();

const user = { email: '', password: '' };

const AplicationProvider = ({ children }) => {
  const [informationsUser, setInformationsUser] = useState(user);
  const [searchInputVisible, setSearchInputVisible] = useState(false);
  const [Data, setData] = useState([]);
  const [recipeInfo, setRecipeInfo] = useState([]);
  const [id, setId] = useState('');
  const [recomendation, setRecomendation] = useState([]);

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
    getFirstMeals()
      .then((answer) => setData(answer.meals));
  };

  const updateMeals = (answer) => {
    setData(answer);
  };

  const getFoodScreenInfos = (foodId) => {
    getMealById(foodId).then((data) => {
      setRecipeInfo(data.meals[0]);
      setId(foodId);
    });
    getFirstDrinks().then((data) => setRecomendation(data.drinks));
  };

  const context = {
    informationsUser,
    saveInput,
    searchInputVisible,
    searchInput,
    Data,
    getMeals,
    updateMeals,
    getFoodScreenInfos,
    recipeInfo,
    recomendation,
    id,
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
