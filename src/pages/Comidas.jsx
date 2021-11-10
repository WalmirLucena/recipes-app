import React from 'react';
import Header from '../components/Header';
import FoodSearchResults from '../components/FoodSearchResults';
import Footer from '../components/Footer';

export default function Comidas() {
  return (
    <>
      <Header title="Comidas" profile search />
      <FoodSearchResults />
      <Footer />
    </>
  );
}
