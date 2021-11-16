import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DrinkContext from '../contexts/DrinkContext';
import FoodContext from '../contexts/FoodContext';

export default function Categories() {
  const [buttonFilter, setButtonFilter] = useState();

  const { categoryFood, fetchByCategoryFood, fetchInitialFood } = useContext(FoodContext);
  const { categoryDrink,
    fetchByCategoryDrink,
    fetchInitialDrink } = useContext(DrinkContext);
  const { pathname } = useLocation();
  let categories = [];
  let fetchByCategory = [];
  let fetchInitialPage = [];

  if (pathname.includes('/comidas')) {
    categories = categoryFood;
    fetchByCategory = fetchByCategoryFood;
    fetchInitialPage = fetchInitialFood;
  }

  if (pathname.includes('/bebidas')) {
    categories = categoryDrink;
    fetchByCategory = fetchByCategoryDrink;
    fetchInitialPage = fetchInitialDrink;
  }

  const handleClick = (e) => {
    if (buttonFilter === e.target.name) {
      fetchInitialPage();
      setButtonFilter('');
    } else {
      setButtonFilter(e.target.name);
      fetchByCategory(e.target.name);
    }
  };

  const handleAll = () => {
    fetchInitialPage();
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
      <button
        type="button"
        name="All"
        key="All"
        data-testid="All-category-filter"
        onClick={ () => handleAll() }
      >
        All
      </button>
    </div>
  );
}
