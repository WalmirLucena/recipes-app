import PropTypes from 'prop-types';
import React from 'react';
import { useLocation } from 'react-router-dom';
import ButtonIniciar from './ButtonIniciar';
import '../../styles/RecipeBottom.css';

export default function RecipeDetailBotom({ recipe }) {
  const { pathname } = useLocation();

  // const verifyInfo = () => {
  //   if () return false;

  //   return true;
  // };
  return (
    <div className="bottom-container">
      <h3>Instructions</h3>
      <div className="instructions-container">
        <p data-testid="instructions">{ recipe.strInstructions }</p>
      </div>
      {pathname.includes('/comidas') && <iframe
        data-testid="video"
        width="300"
        height="200"
        src={ recipe.strYoutube }
        title={ pathname.includes('/comidas') ? recipe.strMeal : recipe.strDrink }
      />}

      <ButtonIniciar />
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
