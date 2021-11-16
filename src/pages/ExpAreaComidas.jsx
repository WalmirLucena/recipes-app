import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import FoodContext from '../contexts/FoodContext';
import Footer from '../components/Footer';

export default function ExpAreaComidas() {
  const [recipesByArea, setRecipesByArea] = useState([]);
  const [selectedArea, setSelectedArea] = useState('All');
  const { area, loading, setLoading, fetchByArea } = useContext(FoodContext);

  const fetchAll = async () => {
    const MAX_RECIPES = 12;
    const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(URL);
    const json = await response.json();
    const recipes = await json.meals;
    const recipesSlice = recipes.slice(0, MAX_RECIPES);

    setRecipesByArea(recipesSlice);
  };

  const fetchRecipesByArea = async (areaName) => {
    const MAX_RECIPES = 12;
    const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`;
    const response = await fetch(URL);
    const json = await response.json();
    const recipes = await json.meals;
    const recipesSlice = recipes.slice(0, MAX_RECIPES);

    setRecipesByArea(recipesSlice);
  };

  const loadRecipes = ({ target }) => {
    setSelectedArea(target.value);
    if (target.value === 'All') {
      fetchAll();
    } else {
      fetchRecipesByArea(target.value);
    }
  };

  useEffect(() => {
    setLoading(true);

    fetchAll();
    fetchByArea();
  }, []);

  return (
    <>
      <Header title="Explorar Origem" profile search />
      {
        loading
          ? <span>Loading...</span>
          : (
            <section>
              <select
                id="area"
                value={ selectedArea }
                onChange={ loadRecipes }
                data-testid="explore-by-area-dropdown"
              >
                <option value="all" data-testid="All-option">All</option>
                {
                  area.map((crrArea, i) => (
                    <option
                      key={ i }
                      value={ crrArea.strArea }
                      data-testid={ `${crrArea.strArea}-option` }
                    >
                      { crrArea.strArea }
                    </option>
                  ))
                }
              </select>
            </section>
          )
      }

      {
        recipesByArea.map((recipe, i) => (
          <Link to={ `/comidas/${recipe.idMeal}` } key={ i }>
            <section data-testid={ `${i}-recipe-card` }>
              <img
                height="150px"
                src={ recipe.strMealThumb }
                alt={ recipe.strMeal }
                data-testid={ `${i}-card-img` }
              />
              <span data-testid={ `${i}-card-name` }>{ recipe.strMeal }</span>
            </section>
          </Link>
        ))
      }
      <Footer />
    </>
  );
}
