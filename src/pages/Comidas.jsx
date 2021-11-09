import React from 'react';
import Header from '../components/Header';
import FoodSearchResults from '../components/FoodSearchResults';
import Categories from '../components/Categories';

export default function Comidas() {
  return (
    <>
      <Header title="Comidas" profile search />
      <Categories />
      <FoodSearchResults />
    </>
  );
}
