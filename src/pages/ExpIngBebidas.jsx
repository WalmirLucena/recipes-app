import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import DrinkContext from '../contexts/DrinkContext';

export default function ExpIngBebidas() {
  const {
    fetchIngredientsAPI,
    drinkIngredients,
    loadingIngredients,
    setLoadingIngredients,
  } = useContext(DrinkContext);

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
            drinkIngredients.map((ingredient, i) => {
              const { strIngredient1 } = ingredient;
              return (
                <Link to="/bebidas" key={ i }>
                  <section data-testid={ `${i}-ingredient-card` }>
                    <img
                      height="150px"
                      src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
                      alt={ strIngredient1 }
                      data-testid={ `${i}-card-img` }
                    />
                    <span data-testid={ `${i}-card-name` }>{ strIngredient1 }</span>
                  </section>
                </Link>
              );
            })
          )
      }
      <Footer />
    </div>
  );
}
