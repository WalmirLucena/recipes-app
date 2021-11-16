import PropTypes from 'prop-types';
import React from 'react';
import { useLocation } from 'react-router-dom';
import funcFilterObjDetails from '../../helper/funcFilterObjDetails';
import ButtonsFavComp from './ButtonsFavComp';

export default function RecipeDetailTop({ recipe }) {
  const { pathname } = useLocation();
  const ingredientMeasute = funcFilterObjDetails(recipe);

  return (
    <div>
      <img
        height="300px"
        src={ pathname.includes('/comidas') ? recipe.strMealThumb : recipe.strDrinkThumb }
        alt={ pathname.includes('/comidas') ? recipe.strMeal : recipe.strDrink }
        data-testid="recipe-photo"
      />
      <h1
        data-testid="recipe-title"
      >
        { pathname.includes('/comidas') ? recipe.strMeal : recipe.strDrink }
      </h1>
      <h4 data-testid="recipe-category">
        { pathname.includes('/comidas') ? recipe.strCategory : recipe.strAlcoholic }
      </h4>
      <ButtonsFavComp recipe={ recipe } />
      <div>
        Categorias
        <h3 data-testid="recipe-category">
          { recipe.strTags }
        </h3>
      </div>
      <ul>
        {
          ingredientMeasute.map((e, i) => (
            <li
              key={ i }
              data-testid={ `${i}-ingredient-name-and-measure` }
            >
              <div>
                { Object.keys(e) }
                { ' / ' }
                { Object.values(e) }
              </div>

            </li>
          ))
        }
      </ul>
    </div>
  );
}

RecipeDetailTop.propTypes = {
  recipe: PropTypes.shape({
    strAlcoholic: PropTypes.string.isRequired,
    strCategory: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
    strTags: PropTypes.string.isRequired,
  }).isRequired,
};
