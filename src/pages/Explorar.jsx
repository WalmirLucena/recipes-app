import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/Explorar.css';

export default function Explorar() {
  const history = useHistory();

  return (
    <div>
      <Header title="Explorar" profile />
      <div className="button-container">
        <div>
          <button
            type="button"
            onClick={ () => history.push('/explorar/comidas') }
            data-testid="explore-food"
          >
            Explorar Comidas
          </button>
          <button
            type="button"
            onClick={ () => history.push('/explorar/bebidas') }
            data-testid="explore-drinks"
          >
            Explorar Bebidas
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
