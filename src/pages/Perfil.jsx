import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Perfil() {
  const [loading, setLoading] = useState(true);
  const [userEmail, setEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    const getLocalStorage = async () => {
      const { email } = await JSON.parse(localStorage.getItem('user'));
      setEmail(email);

      setLoading(false);
    };
    getLocalStorage();
  }, []);

  const exit = () => {
    localStorage.clear();

    history.push('/');
  };

  return (
    <div>
      <Header title="Perfil" profile />
      <span data-testid="profile-email">{ loading ? '...' : userEmail }</span>
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
      <Footer />
    </div>
  );
}
