import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const ContextAplication = createContext();

const user = { email: '', password: '' };

const AplicationProvider = ({ children }) => {
  const [informationsUser, setInformationsUser] = useState(user);
  const [searchInputVisible, setSearchInputVisible] = useState(false);

  const saveInput = (input) => {
    const inputsLogin = {
      email: input.email,
      password: input.password,
    };
    setInformationsUser(inputsLogin);
  };

  const searchInput = (boolean) => {
    const inputSearch = {
      searchInputIsVisible: boolean,
    };
    setSearchInputVisible(inputSearch);
  };

  const context = {
    informationsUser,
    saveInput,
    searchInputVisible,
    searchInput,
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
