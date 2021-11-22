import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = () => {
    const inProgressRecipes = { meals: {}, cocktails: {} };
    localStorage.setItem('doneRecipes', JSON.stringify([]));
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));

    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);

    const user = { email };

    localStorage.setItem('user', JSON.stringify(user));

    history.push('/comidas');
  };

  const verifyInfo = () => {
    const passwordLength = 6;
    const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (validEmail.test(email) && password.length > passwordLength) return false;

    return true;
  };

  return (
    <form className="login-form">
      <div>
        <label htmlFor="email-input">
          E-mail
          <input
            id="email-input"
            type="text"
            value={ email }
            className="login-input"
            onChange={ (e) => setEmail(e.target.value) }
            data-testid="email-input"
          />
        </label>
      </div>
      <div>
        <label htmlFor="password-input">
          Senha
          <input
            id="password-input"
            type="password"
            value={ password }
            className="login-input"
            onChange={ (e) => setPassword(e.target.value) }
            data-testid="password-input"
          />
        </label>
      </div>
      <div>
        <button
          variant="warning"
          type="button"
          onClick={ handleLogin }
          disabled={ verifyInfo() }
          data-testid="login-submit-btn"
          className="login-button"
        >
          Entrar
        </button>
      </div>
    </form>
  );
}
