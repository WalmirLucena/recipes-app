import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';
import fetchRandom from '../helper/fetchRandom';

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
      <Button
        variant="secondary"
        onClick={ () => history.push('/explorar/comidas/ingredientes') }
        data-testid="explore-by-ingredient"
      >
        Por Ingredientes
      </Button>
      <Button
        variant="secondary"
        onClick={ verifyAuth }
        data-testid="explore-by-area"
      >
        Por Local de Origem
      </Button>
      <Button
        variant="secondary"
        onClick={ surpriseMeFood }
        data-testid="explore-surprise"
      >
        Me Surpreenda!
      </Button>
      <Footer />
    </div>
  );
}
