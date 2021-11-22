import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import fetchRandom from '../helper/fetchRandom';
import '../styles/Explorar.css';

export default function ExpComidas() {
  const history = useHistory();

  const surpriseMeFood = async () => {
    const meal = await fetchRandom('food');
    const id = meal.idMeal;

    history.push(`/comidas/${id}`);
  };

  const verifyAuth = () => {
    history.push('/explorar/comidas/area');
  };

  return (
    <div>
      <Header title="Explorar Comidas" profile />
      <div className="button-container">
        <div>
          <button
            type="button"
            onClick={ () => history.push('/explorar/comidas/ingredientes') }
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
          <button
            type="button"
            onClick={ verifyAuth }
            data-testid="explore-by-area"
          >
            Por Local de Origem
          </button>
          <button
            type="button"
            onClick={ surpriseMeFood }
            data-testid="explore-surprise"
          >
            Me Surpreenda!
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
