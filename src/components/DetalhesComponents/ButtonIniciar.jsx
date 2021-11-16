import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

export default function IniciarBtn() {
  const [visible, setVisible] = useState('visible');
  const [inProgress, setInProgress] = useState(false);
  const history = useHistory();
  const { pathname } = useLocation();
  const idPathname = pathname.match(/\d+((.|,)\d+)?/)[0];
  const comida = pathname.includes('/comidas');

  useEffect(() => {
    const getLocalDone = async () => {
      const doneRecipes = await JSON.parse(localStorage.getItem('doneRecipes'));
      const doneRecipe = await doneRecipes.find(({ id }) => id === idPathname);

      if (doneRecipe) {
        setVisible('hidden');
      }
    };

    getLocalDone();

    const getLocalProgress = async () => {
      const inProgressRecipes = await JSON
        .parse(localStorage.getItem('inProgressRecipes'));
      const inProgressRecipe = comida
        ? inProgressRecipes.meals : inProgressRecipes.cocktails;

      if (inProgressRecipe) {
        setInProgress(true);
      }
    };

    getLocalProgress();
  }, []);

  const handleClick = () => {
    if (comida) { history.push(`/comidas/${idPathname}/in-progress`); } else {
      history.push(`/bebidas/${idPathname}/in-progress`);
    }
  };

  const iniciarBtnStyle = {
    visibility: { visible },
    position: 'fixed',
    bottom: '0px',
  };

  return (
    <button
      type="button"
      data-testid="start-recipe-btn"
      onClick={ handleClick }
      style={ iniciarBtnStyle }
    >
      { inProgress ? 'Continuar Receita' : 'Iniciar receita' }
    </button>
  );
}
