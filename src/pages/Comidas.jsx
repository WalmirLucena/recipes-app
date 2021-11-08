import React from 'react';
import Header from '../components/Header';
import FoodSearchResults from '../components/FoodSearchResults';

export default function Comidas() {
  return (
    <>
      <Header title="Comidas" profile search />
      <FoodSearchResults />
    </>
  );
}
