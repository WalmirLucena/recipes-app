import PropTypes from 'prop-types';
import React from 'react';
import { useLocation } from 'react-router-dom';

export default function RecipeDetailBotom({ recipe }) {
  const { pathname } = useLocation();

  // const verifyInfo = () => {
  //   if () return false;

  //   return true;
  // };
  return (
    <div>
      <p data-testid="instructions">{ recipe.strInstructions }</p>
      {pathname.includes('/comidas') && <iframe
        data-testid="video"
        width="300"
        height="200"
        src={ recipe.strYoutube }
        title={ pathname.includes('/comidas') ? recipe.strMeal : recipe.strDrink }
      />}
      <button
        type="button"
        data-testid="start-recipe-btn"
        style={ { position: 'fixed', bottom: 0 } }
        // onClick={ verifyInfo }
      >
        Iniciar receita
      </button>
    </div>
  );
}

RecipeDetailBotom.propTypes = {
  recipe: PropTypes.shape({
    strDrink: PropTypes.string.isRequired,
    strInstructions: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
    strYoutube: PropTypes.string.isRequired,
  }).isRequired,
};
