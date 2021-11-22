import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import DrinkContext from '../contexts/DrinkContext';
import '../styles/DrinkSearchResults.css';

export default function DrinkSearchResults() {
  const { loadingDrink, filteredDrink } = useContext(DrinkContext);

  if (loadingDrink) return <span className="loading">Loading...</span>;

  return (
    <main className="main-content">
      {
        filteredDrink.map((recipe, i) => (
          <Link to={ `/bebidas/${recipe.idDrink}` } key={ i } detail>
            <section className="card-content" data-testid={ `${i}-recipe-card` }>
              <img
                src={ recipe.strDrinkThumb }
                height="100px"
                alt={ `${recipe.strDrink} Thumbnail` }
                data-testid={ `${i}-card-img` }
              />
              <span data-testid={ `${i}-card-name` }>{ recipe.strDrink }</span>
            </section>
          </Link>
        ))
      }
    </main>
  );
}
