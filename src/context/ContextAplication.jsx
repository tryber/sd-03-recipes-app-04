import React, { createContext, useState } from 'react';
import { getFirstMeals } from '../services/foodApi';
import PropTypes from 'prop-types';

export const ContextAplication = createContext();

const user = { email: '', password: '' };

const AplicationProvider = ({ children }) => {
  const [informationsUser, setInformationsUser] = useState(user);
  const [searchInputVisible, setSearchInputVisible] = useState(false);
  const [Data, setData] = useState([]);

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
  }

  const context = {
    informationsUser,
    saveInput,
    searchInputVisible,
    searchInput,
    Data,
    getMeals,
    updateMeals,
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
