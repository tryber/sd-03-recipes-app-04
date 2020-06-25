import React, { useContext, useState } from 'react';

const { saveInput } = useContext();
const [input, setInput] = useState({ email: '', password: '' });
const [informations, setInformations] = useState(false);

// const saveInput = (input) => {
//   const inputsLogin = {
//     email: input.email,
//     password: input.password,
//   };
//   setInput(inputsLogin);
// };

const IsEmail = (name, email) => {
  const exclude = /[^@-.w]|^[_@.-]|[._-]{2}|[@.]{2}|(@)[^@]*1/;
  const check = /@[w-]+./;
  const checkend = /.[a-zA-Z]{2,3}$/;
  if (
    email.search(exclude) !== -1 ||
    email.search(check) === -1 ||
    email.search(checkend) === -1
  ) {
    return setInput({ ...input, [name]: email }) && setInformations(false);
  }
  return setInput({ ...input, [name]: email }) && setInformations(true);
};

const IsPassword = (name, password) => {
  setInput({ ...input, [name]: password });
  if (input.password.length >= 6) return setInformations(true);
  return null;
}

const handleChangeInput = (name, ele) => {
  if (name === 'email') return IsEmail(name, ele)
  return IsPassword(name, ele);
};

const handleFormSubmit = () => {
  saveInput(input);
};

const createForm = () => {
  return (
    <form>
      <h2>Login</h2>
      <input
        data-testid="email-input"
        onChange={(ele) => handleChangeInput('email', ele.target.value)}
        type="text"
        name="email"
      />
      <input
        data-testid="password-input"
        onChange={(ele) => handleChangeInput('password', ele.target.value)}
        type="text"
        name="password"
      />
      <button
        disabled={informations}
        data-testid="login-submit-btn"
        onClick={() => handleFormSubmit}
      >
        Entrar
      </button>
    </form>
  );
};

function LoginScreen() {
  return <div>{createForm}</div>;
}

export default LoginScreen;
