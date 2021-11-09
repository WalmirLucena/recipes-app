import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import DrinkContext from '../contexts/DrinkContext';
import FoodContext from '../contexts/FoodContext';

export default function Categories() {
  const { categoryFood, fetchByCategoryFood } = useContext(FoodContext);
  const { categoryDrink, fetchByCategoryDrink } = useContext(DrinkContext);
  const { pathname } = useLocation();
  let categories = [];
  let fetchByCategory = [];

  if (pathname.includes('/comidas')) {
    categories = categoryFood;
    fetchByCategory = fetchByCategoryFood;
  }

  if (pathname.includes('/bebidas')) {
    categories = categoryDrink;
    fetchByCategory = fetchByCategoryDrink;
  }

  const handleClick = (e) => {
    fetchByCategory(e.target.name);
  };

  return (
    <div>
      {categories.map(({ strCategory }) => (
        <button
          type="button"
          name={ strCategory }
          key={ strCategory }
          data-testid={ `${strCategory}-category-filter` }
          onClick={ (e) => handleClick(e) }
        >
          {strCategory}

        </button>
      ))}
    </div>
  );
}
