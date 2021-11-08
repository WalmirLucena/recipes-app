import React from 'react';
import { useLocation } from 'react-router-dom';
import DrinkContext from '../contexts/DrinkContext';
import FoodContext from '../contexts/FoodContext';



export default function Categories() {
  const { categoryFood } = useContext(FoodContext);
  const { categoryDrink } = useContext(DrinkContext);
  const { pathname } = useLocation();

  const xxx = async () => {
    if (pathname.includes('/comidas')) {
      const categories = categoryFood;
    }

    if (pathname.includes('/bebidas')) {
      const categories = categoryDrink;
    }
  };

  return (
    <>

    </>
  );
}
