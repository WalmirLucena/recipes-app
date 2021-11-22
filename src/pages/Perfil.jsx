import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/Perfil.css';

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
    <div className="main-container">
      <Header title="Perfil" profile />
      <span
        className="profile"
        data-testid="profile-email"
      >
        { loading ? '...' : userEmail }

      </span>
      <div className="button-container">
        <div>
          <Link to="/receitas-feitas" className="link">
            <button type="button" data-testid="profile-done-btn">
              Receitas Feitas
            </button>
          </Link>
          <Link to="/receitas-favoritas" className="link">
            <button type="button" data-testid="profile-favorite-btn">
              Receitas Favoritas
            </button>
          </Link>
          <button
            type="button"
            onClick={ exit }
            data-testid="profile-logout-btn"
          >
            Sair
          </button>
        </div>

      </div>
      <Footer />
    </div>
  );
}
