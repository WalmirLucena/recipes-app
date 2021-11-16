import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ButtonFavComplexity from './ButtonFavComplexity';
import shareIcon from '../../images/shareIcon.svg';

export default function ButtonsFavComp({ recipe }) {
  const { pathname } = useLocation();
  const [btnIniciar, setBtnIniciar] = useState(false);

  const recipeReformed = {
    id: pathname.includes('/comidas') ? recipe.idMeal : recipe.idDrink,
    type: pathname.includes('/comidas') ? 'comida' : 'bebida',
    area: pathname.includes('/comidas') ? recipe.strArea : '',
    category: recipe.strCategory,
    alcoholicOrNot: pathname.includes('/comidas') ? '' : recipe.strAlcoholic,
    name: pathname.includes('/comidas') ? recipe.strMeal : recipe.strDrink,
    image: pathname.includes('/comidas') ? recipe.strMealThumb : recipe.strDrinkThumb,
  };

  // console.log(recipe);

  const shareClick = () => {
    navigator.clipboard.writeText(window.location.href);
    setBtnIniciar(true);
  };

  return (
    <div>
      <button
        type="button"
        onClick={ shareClick }
      >
        <img src={ shareIcon } alt="Compartilhar" data-testid="share-btn" />
      </button>
      <ButtonFavComplexity recipeReformed={ recipeReformed } />
      <p
        style={ btnIniciar ? { visibility: 'visible' } : { visibility: 'hidden' } }
      >
        Link copiado!
      </p>
    </div>
  );
}

ButtonsFavComp.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
};
