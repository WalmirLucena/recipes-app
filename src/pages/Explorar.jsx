import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';

export default function Explorar() {
  const history = useHistory();

  return (
    <div>
      <Header title="Explorar" profile />
      <Button
        variant="secondary"
        onClick={ () => history.push('/explorar/comidas') }
        data-testid="explore-food"
      >
        Explorar Comidas
      </Button>
      <Button
        variant="secondary"
        onClick={ () => history.push('/explorar/bebidas') }
        data-testid="explore-drinks"
      >
        Explorar Bebidas
      </Button>
    </div>
  );
}
