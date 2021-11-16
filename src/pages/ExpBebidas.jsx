import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import fetchRandom from '../helper/fetchRandom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ExpBebidas() {
  const history = useHistory();

  const surpriseMeDrink = async () => {
    const drink = await fetchRandom('drink');
    const id = drink.idDrink;

    history.push(`/bebidas/${id}`);
  };

  return (
    <div>
      <Header title="Explorar Bebidas" profile />
      <Button
        variant="secondary"
        onClick={ () => history.push('/explorar/bebidas/ingredientes') }
        data-testid="explore-by-ingredient"
      >
        Por Ingredientes
      </Button>
      <Button
        variant="secondary"
        onClick={ surpriseMeDrink }
        data-testid="explore-surprise"
      >
        Me Surpreenda!
      </Button>
      <Footer />
    </div>
  );
}
