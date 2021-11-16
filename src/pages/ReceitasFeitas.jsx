import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

export default function ReceitasFeitas() {
  const [loading, setLoading] = useState(true);
  const [copy, setCopy] = useState(false);
  const [favorite, setFavorite] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    // const localDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

    const doneRecipes = [
      {
        id: '52771',
        type: 'comida',
        area: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
        doneDate: '23/06/2020',
        tags: ['Pasta', 'Curry'],
      },
      {
        id: '178319',
        type: 'bebida',
        area: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
        doneDate: '23/06/2020',
        tags: [],
      },
    ];

    setFiltered(doneRecipes);
    setFavorite(doneRecipes);
    // setFiltered(localDoneRecipes);
    // setFavorite(localDoneRecipes);
    setLoading(false);
  }, []);

  const handleShare = (event) => {
    event.preventDefault();

    const SECONDS = 5000;
    setCopy(true);

    const URL = `http://www.localhost:3000${event.target.id}`;

    navigator.clipboard.writeText(URL);
    setTimeout(() => setCopy(false), SECONDS);
  };

  const handleFilter = (event) => {
    const { name } = event.target;
    event.preventDefault();

    if (name === 'all') {
      setLoading(true);

      setFiltered(favorite);
      setLoading(false);
    }

    if (name === 'food') {
      setLoading(true);

      const filteredFoods = favorite.filter((recipe) => recipe.type === 'comida');

      setFiltered(filteredFoods);
      setLoading(false);
    }

    if (name === 'drink') {
      setLoading(true);

      const filteredDrinks = favorite.filter((recipe) => recipe.type === 'bebida');

      setFiltered(filteredDrinks);
      setLoading(false);
    }
  };

  return (
    <div>
      <Header title="Receitas Feitas" profile />
      <section>
        <Button
          name="all"
          variant="secondary"
          onClick={ handleFilter }
          data-testid="filter-by-all-btn"
        >
          All
        </Button>
        <Button
          name="food"
          variant="secondary"
          onClick={ handleFilter }
          data-testid="filter-by-food-btn"
        >
          Food
        </Button>
        <Button
          name="drink"
          variant="secondary"
          onClick={ handleFilter }
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </Button>
        { copy && <span>Link copiado!</span> }
      </section>
      <section>
        { loading
          ? <span>Loading...</span>
          : (
            filtered.map((recipe, i) => (
              <article key={ i }>
                <Link to={ `/${recipe.type}s/${recipe.id}` }>
                  <img
                    height="150px"
                    src={ recipe.image }
                    alt={ recipe.name }
                    data-testid={ `${i}-horizontal-image` }
                  />
                  <span data-testid={ `${i}-horizontal-top-text` }>
                    { recipe.alcoholicOrNot || `${recipe.area} - ${recipe.category}` }
                  </span>
                  <span data-testid={ `${i}-horizontal-name` }>{ recipe.name }</span>
                  <span data-testid={ `${i}-horizontal-done-date` }>
                    { `Feita em: ${recipe.doneDate}` }
                  </span>
                  {
                    recipe.tags.map((tag) => (
                      <span
                        key={ tag }
                        data-testid={ `${i}-${tag}-horizontal-tag` }
                      >
                        { tag }
                      </span>
                    ))
                  }
                </Link>
                <button type="button" onClick={ handleShare }>
                  <img
                    id={ `/${recipe.type}s/${recipe.id}` }
                    src={ shareIcon }
                    alt="Share"
                    data-testid={ `${i}-horizontal-share-btn` }
                  />
                </button>
              </article>

            )))}
      </section>
    </div>
  );
}
