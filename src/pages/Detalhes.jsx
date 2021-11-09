import React, { useEffect, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DrinkContext from '../contexts/DrinkContext';
import FoodContext from '../contexts/FoodContext';
import fetchIDAPI from '../helper/fetchIDAPI';
import fetch25Random from '../helper/fetch25Random';

export default function Detalhes() {
  const { setLoadingFood } = useContext(FoodContext);
  const { setLoadingDrink } = useContext(DrinkContext);
  const { pathname } = useLocation();
  const [recipe, setRecipe] = useState({});
  const [random6, setRandom6] = useState([]);

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

  const fetch6 = async () => {
    const resp = await fetch25Random(pathname.includes('/bebidas') ? 'food' : 'drink');
    const limit = 6;
    let resp6 = [];
    if (resp) {
      for (let i = 0; i < limit; i += 1) {
        const unidade = resp[i];
        resp6 = [
          ...resp6,
          unidade,
        ];
      }
    }

    setRandom6(resp6);
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
    fetch6();
  }, []);

  // measure.map((e) => console.log(e[1]));

  console.log(random6);
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
      <button
        type="button"
        data-testid="share-btn"
      >
        Compartilhar
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
              <div>
                { Object.keys(e) }
                { ' / ' }
                { Object.values(e) }
              </div>

            </li>
          ))
        }
      </ul>
      <br />
      <div>
        {
          random6.map((e, i) => (
            <div
              key={ pathname.includes('/bebidas') ? e.strMeal : e.strDrink }
              data-testid={ `${i}-recomendation-card` }
            >
              <img
                height="110px"
                src={ pathname.includes('/bebidas') ? e.strMealThumb : e.strDrinkThumb }
                alt={ pathname.includes('/bebidas') ? e.strMeal : e.strDrink }
              />
              <h4
                data-testid={ `${i}-recomendation-title` }
              >
                { pathname.includes('/bebidas') ? e.strMeal : e.strDrink }
              </h4>
            </div>
          ))
        }
      </div>
      <br />
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
