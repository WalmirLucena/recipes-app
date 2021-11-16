import React from 'react';
import Header from '../components/Header';
import FoodSearchResults from '../components/FoodSearchResults';
import Categories from '../components/Categories';
import Footer from '../components/Footer';

export default function Comidas() {
  return (
    <>
      <Header title="Comidas" profile search />
      <Categories />
      <FoodSearchResults />
      <Footer />
    </>
  );
}
