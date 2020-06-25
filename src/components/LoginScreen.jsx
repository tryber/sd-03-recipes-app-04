import React, { useContext, useState } from 'react';
import { ContextAplication } from '../context/ContextAplication';

const IsEmail = (name, email, input, setInput, setInformations) => {
  const exclude = '/[^@-.w]|^[_@.-]|[._-]{2}|[@.]{2}|(@)[^@]*1/';
  const check = '/@[w-]+./';
  const checkend = '/.[a-zA-Z]{2,3}$/';
  if (
    email.search(exclude) !== -1
    || email.search(check) === -1
    || email.search(checkend) === -1
  ) {
    return setInput({ ...input, [name]: email }) && setInformations(false);
  }
  return setInput({ ...input, [name]: email }) && setInformations(true);
};

const IsPassword = (name, password, input, setInput, setInformations) => {
  setInput({ ...input, [name]: password });
  if (input.password.length >= 6) return setInformations(true);
  return null;
};

const handleChangeInput = (name, ele, input, setInput) => {
  if (name === 'email') return IsEmail(name, ele, input, setInput);
  return IsPassword(name, ele);
};

const handleFormSubmit = (saveInput, input) => {
  saveInput(input);
};

const createForm = (saveInput, input, setInput, informations, setInformations) => {
  return (
    <form>
      <h2>Login</h2>
      <input
        data-testid="email-input"
        onChange={(ele) => handleChangeInput('email', ele.target.value, input, setInput, setInformations)}
        type="text"
        name="email"
      />
      <input
        data-testid="password-input"
        onChange={(ele) => handleChangeInput('password', ele.target.value, input, setInput, setInformations)}
        type="text"
        name="password"
      />
      <button
        type="button"
        disabled={informations}
        data-testid="login-submit-btn"
        onClick={handleFormSubmit(saveInput, input)}
      >
        Entrar
      </button>
    </form>
  );
};

function LoginScreen() {
  const { saveInput } = useContext(ContextAplication);
  const [input, setInput] = useState({ email: '', password: '' });
  const [informations, setInformations] = useState(false);

  return (
    <div>
      {createForm([saveInput, input, setInput, informations, setInformations])}
    </div>
  );
}

export default LoginScreen;
