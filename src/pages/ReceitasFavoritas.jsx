import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import unfavoriteIcon from '../images/blackHeartIcon.svg';

export default function ReceitasFavoritas() {
  const [copy, setCopy] = useState(false);
  const [favorite, setFavorite] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const getLocalStorage = async () => {
      const localFavorites = await JSON.parse(localStorage.getItem('favoriteRecipes'));

      setFavorite(localFavorites);
      setFiltered(localFavorites);
    };
    getLocalStorage();
  }, []);

  const removeFavorite = (event) => {
    const { id } = event.target;
    const removeItemFilter = favorite.filter((recipe) => recipe.id !== id);

    localStorage.setItem('favoriteRecipes', JSON.stringify(removeItemFilter));

    setFavorite(removeItemFilter);
    setFiltered(removeItemFilter);
  };

  const updateClipboard = (str) => {
    window.navigator.clipboard.writeText(str)
      .then(() => setCopy(true), () => console.log('Link não foi copiado!'));
  };

  const handleShare = (event) => {
    event.preventDefault();

    setCopy(true);

    const URL = `http://localhost:3000${event.target.id}`;

    updateClipboard(URL);
  };

  const handleFilter = (event) => {
    const { name } = event.target;
    event.preventDefault();

    if (name === 'all') {
      setFiltered(favorite);
    }

    if (name === 'food') {
      const filteredFoods = favorite.filter((recipe) => recipe.type === 'comida');

      setFiltered(filteredFoods);
    }

    if (name === 'drink') {
      const filteredDrinks = favorite.filter((recipe) => recipe.type === 'bebida');

      setFiltered(filteredDrinks);
    }
  };

  return (
    <div>
      <Header title="Receitas Favoritas" profile />
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
        { !filtered
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
                </Link>
                <button type="button" onClick={ handleShare }>
                  <img
                    id={ `/${recipe.type}s/${recipe.id}` }
                    src={ shareIcon }
                    alt="Share"
                    data-testid={ `${i}-horizontal-share-btn` }
                  />
                </button>
                <button type="button" onClick={ removeFavorite }>
                  <img
                    id={ recipe.id }
                    src={ unfavoriteIcon }
                    alt="Remove Favorite"
                    data-testid={ `${i}-horizontal-favorite-btn` }
                  />
                </button>
              </article>
            )))}
      </section>
    </div>
  );
}
