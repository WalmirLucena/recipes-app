import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import FoodContext from '../contexts/FoodContext';

export default function ExpIngComidas() {
  const {
    fetchIngredientsAPI,
    foodIngredients,
    loadingIngredients,
    setLoadingIngredients,
  } = useContext(FoodContext);

  useEffect(() => {
    setLoadingIngredients(true);
    fetchIngredientsAPI();
  }, []);

  return (
    <div>
      <Header title="Explorar Ingredientes" profile />

      {
        loadingIngredients
          ? <span>Loading...</span>
          : (
            foodIngredients.map((ingredient, i) => {
              const { strIngredient } = ingredient;
              return (
                <Link to="/comidas" key={ i }>
                  <section data-testid={ `${i}-ingredient-card` }>
                    <img
                      height="150px"
                      src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
                      alt={ strIngredient }
                      data-testid={ `${i}-card-img` }
                    />
                    <span data-testid={ `${i}-card-name` }>{ strIngredient }</span>
                  </section>
                </Link>
              );
            })
          )
      }
    </div>
  );
}
