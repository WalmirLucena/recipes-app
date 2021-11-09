import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import DrinkContext from '../contexts/DrinkContext';
import FoodContext from '../contexts/FoodContext';

export default function Categories() {
  const { categoryFood } = useContext(FoodContext);
  const { categoryDrink } = useContext(DrinkContext);
  const { pathname } = useLocation();
  let categories = [];

  if (pathname.includes('/comidas')) {
    categories = categoryFood;
  }

  if (pathname.includes('/bebidas')) {
    categories = categoryDrink;
  }

  const handleClick = (e) => {
    /*  const filter = { value }; */
    console.log(e.target.name);
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
