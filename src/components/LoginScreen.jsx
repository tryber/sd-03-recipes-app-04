import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ContextAplication } from '../context/ContextAplication';

import './CSS/LoginScreen.css';

const handleChangeInput = (name, event, input, setInput) => {
  setInput({ ...input, [name]: event });
};

const handleFormSubmit = (saveInput, input, history) => {
  localStorage.setItem('user', JSON.stringify({ email: input.email }));
  localStorage.setItem('mealsToken', 1);
  localStorage.setItem('cocktailsToken', 1);
  saveInput(input);

  return history.push('./comidas');
};

function createForm(input, setInput) {
  return (
    <form>
      <div className="input-field col s6 ">
        <input
          className="input-login"
          data-testid="email-input"
          onChange={(ele) => handleChangeInput('email', ele.target.value, input, setInput)}
          type="email"
          name="email"
          placeholder="Email"
        />
        <input
          className="input-login"
          data-testid="password-input"
          onChange={(ele) => handleChangeInput('password', ele.target.value, input, setInput)}
          type="password"
          name="password"
          placeholder="Senha"
        />
      </div>
    </form>
  );
}

function LoginScreen() {
  const { saveInput } = useContext(ContextAplication);
  const [input, setInput] = useState({ email: '', password: '' });
  const [informations, setInformations] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const validEmailRegEx = /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i;

    if (!validEmailRegEx.test(input.email)
      || (input.password.length <= 6)) return setInformations(true);

    return setInformations(false);
  }, [input]);

  return (
    <div className="login-screen">
      <h1 className="app-name">Cooking Time</h1>
      {createForm(input, setInput, informations)}
      <button
        type="button"
        className=" btn btn-login"
        disabled={informations}
        data-testid="login-submit-btn"
        onClick={() => handleFormSubmit(saveInput, input, history)}
      >
        Entrar
      </button>
    </div>
  );
}

export default LoginScreen;
