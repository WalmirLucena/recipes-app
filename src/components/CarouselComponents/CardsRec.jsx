import React from 'react';
import { useLocation } from 'react-router-dom';

export default function CardsRec({ e1 , i, vis }) {
  const { pathname } = useLocation();
  return (
    <div
      style={ vis ? { visibility: 'visible' } : { visibility: 'hidden' } }
      key={ pathname.includes('/bebidas') ? e1.strMeal : e1.strDrink }
      data-testid={ `${i}-recomendation-card` }
    >
      <img
        height="110px"
        src={ pathname.includes('/bebidas') ? e1.strMealThumb : e1.strDrinkThumb }
        alt={ pathname.includes('/bebidas') ? e1.strMeal : e1.strDrink }
      />
      <h4
        data-testid={ `${i}-recomendation-title` }
      >
        { pathname.includes('/bebidas') ? e1.strMeal : e1.strDrink }
      </h4>
    </div>
  );
}
