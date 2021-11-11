import React, { useEffect, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DrinkContext from '../contexts/DrinkContext';
import fetchIDAPI from '../helper/fetchIDAPI';
import fetch25Random from '../helper/fetch25Random';

export default function DetalhesBebidas(props) {
  const { setLoadingDrink } = useContext(DrinkContext);
  const { pathname } = useLocation();
  const [recipe, setRecipe] = useState(null);
  const [random6, setRandom6] = useState([]);
  const [filterId, setFilterId] = useState('');

  // const filterId = pathname.match(/\d+((.|,)\d+)?/)[0];

  const udatePathname = () => {
    const { match:{ params } } = props;
    console.log(params);
    setFilterId(pathname.match(/\d+((.|,)\d+)?/)[0]);
  };

  const fetchAPIId = async () => {
    const { match:{ params } } = props;
    setLoadingDrink(true);
    const resonse = await fetchIDAPI('drink', params.idBebida);
    setRecipe(resonse);
    setLoadingDrink(false);
    // setLoading(false);
  };

  const fetch6 = async () => {
    const resp = await fetch25Random('food');
    // console.log(resp);
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

  const ingredient = recipe && Object.entries(recipe).filter((e) => {
    const ternario = e[1] !== '' && e[1] !== null;
    let ingredientes;
    if (e[0].includes('strIngredient') && ternario) {
      ingredientes += e[1];
    }
    return ingredientes;
  });

  const measure = recipe && Object.entries(recipe).filter((e) => {
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

  // useEffect(() => {
  //   udatePathname();
  // }, []);

  useEffect(() => {
    fetchAPIId();
    fetch6();
    // if (filterId !== '') {
    //   fetchAPIId();
    //   fetch6();
    // }
  }, []);

  // console.log(random6);

  if (!recipe) return <span>Loading</span>;
  return (
    <div>
      <img
        height="300px"
        src={ recipe.strDrinkThumb }
        alt={ recipe.strDrink }
        data-testid="recipe-photo"
      />
      <h1
        data-testid="recipe-title"
      >
        { recipe.strDrink }
      </h1>
      <h4 data-testid="recipe-category">
        { recipe.strAlcoholic }
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
          recipe && ingredientMeasute().map((e, i) => (
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
              key={ e.strMeal }
              data-testid={ `${i}-recomendation-card` }
            >
              <img
                height="110px"
                src={ e.strMealThumb }
                alt={ e.strMeal }
              />
              <h4
                data-testid={ `${i}-recomendation-title` }
              >
                { e.strMeal }
              </h4>
            </div>
          ))
        }
      </div>
      <br />
      <p data-testid="instructions">{ recipe.strInstructions }</p>
      <button type="button" data-testid="start-recipe-btn">
        Iniciar receita
      </button>
    </div>
  );
}
