import React, { useEffect, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DrinkContext from '../contexts/DrinkContext';
import FoodContext from '../contexts/FoodContext';
import fetchIDAPI from '../helper/fetchIDAPI';

export default function Detalhes() {
  const { setLoadingFood } = useContext(FoodContext);
  const { setLoadingDrink } = useContext(DrinkContext);
  const { pathname } = useLocation();
  const [recipe, setRecipe] = useState({});

  const filterId = pathname.match(/\d+((.|,)\d+)?/)[0];

  const fetchAPIId = async () => {
    if (pathname.includes('/comidas')) {
      setLoadingFood(true);
      const resonse = await fetchIDAPI('food', filterId);
      setRecipe(resonse);
      setLoadingFood(false);
    }

    if (pathname.includes('/bebidas')) {
      setLoadingDrink(true);
      const resonse = await fetchIDAPI('drink', filterId);
      setRecipe(resonse);
      setLoadingDrink(false);
    }
  };

  const ingredient = Object.entries(recipe).filter((e) => {
    const ternario = e[1] !== '' && e[1] !== null;
    let ingredientes;
    if (e[0].includes('strIngredient') && ternario) {
      ingredientes += e[1];
    }
    return ingredientes;
  });

  const measure = Object.entries(recipe).filter((e) => {
    const ternario = e[1] !== '' && e[1] !== null;
    let medida;
    if (e[0].includes('strMeasure') && ternario) {
      medida += e[1];
    }
    return medida;
  });

  const ingredientMeasute = () => {
    let obj = [];
    for (let i = 0; i < ingredient.length; i += 1) {
      const measureTest = measure[i];
      const ingredientTest = ingredient[i];
      const measureTest2 = measureTest[1];
      const ingredientTest2 = ingredientTest[1];

      const obj2 = {
        [ingredientTest2]: measureTest2,
      };
      obj = [
        ...obj,
        obj2,
      ];
    }
    return obj;
  };

  useEffect(() => {
    fetchAPIId();
  }, []);

  // measure.map((e) => console.log(e[1]));

  console.log(recipe);
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
      <button
        type="button"
        data-testid="share-btn"
      >
        Comapartilhar
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favoritar
      </button>
      <div>
        Categorias
        <h3 data-testid="recipe-category">
          { recipe.strTags }
        </h3>
      </div>
      <ul>
        {
          ingredientMeasute().map((e, i) => (
            <li
              key={ i }
              data-testid={ `${i}-ingredient-name-and-measure` }
            >
              { Object.keys(e) }
            </li>
          ))
        }
      </ul>
      <div data-testid="${index}-recomendation-card">
        map das receitas
      </div>
      <p data-testid="instructions">{ recipe.strInstructions }</p>
      {pathname.includes('/comidas') && <iframe
        data-testid="video"
        width="300"
        height="200"
        src={ recipe.strYoutube }
        title={ pathname.includes('/comidas') ? recipe.strMeal : recipe.strDrink }
      />}
      <button type="button" data-testid="start-recipe-btn">
        Iniciar receita
      </button>
    </div>
  );
}
