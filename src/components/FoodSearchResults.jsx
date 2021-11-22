import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import FoodContext from '../contexts/FoodContext';
import '../styles/FoodSearchResults.css';

export default function FoodSearchResults() {
  const { loadingFood, filteredFood } = useContext(FoodContext);

  if (loadingFood) return <span className="loading">Loading...</span>;

  return (
    <main className="main-content">
      {
        filteredFood.map((recipe, i) => (
          <Link to={ `/comidas/${recipe.idMeal}` } key={ i } detail>
            <section className="card-content" data-testid={ `${i}-recipe-card` }>
              <img
                src={ recipe.strMealThumb }
                height="100px"
                alt={ `${recipe.strMeal} Thumbnail` }
                data-testid={ `${i}-card-img` }
              />
              <span data-testid={ `${i}-card-name` }>{ recipe.strMeal }</span>
            </section>
          </Link>
        ))
      }
    </main>
  );
}
