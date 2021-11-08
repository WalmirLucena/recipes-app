import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';
import Header from '../components/Header';

export default function Perfil() {
  const { email } = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  const exit = () => {
    localStorage.clear();

    history.push('/');
  };

  return (
    <div>
      <Header title="Perfil" profile />
      <span data-testid="profile-email">{ email }</span>
      <Link to="/receitas-feitas">
        <Button variant="secondary" data-testid="profile-done-btn">
          Receitas Feitas
        </Button>
      </Link>
      <Link to="/receitas-favoritas">
        <Button variant="secondary" data-testid="profile-favorite-btn">
          Receitas Favoritas
        </Button>
      </Link>
      <Button
        variant="secondary"
        onClick={ exit }
        data-testid="profile-logout-btn"
      >
        Sair
      </Button>
    </div>
  );
}
