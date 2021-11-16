import React from 'react';
import Header from '../components/Header';
import DrinkSearchResults from '../components/DrinkSearchResults';
import Categories from '../components/Categories';
import Footer from '../components/Footer';

export default function Bebidas() {
  return (
    <>
      <Header title="Bebidas" profile search />
      <Categories />
      <DrinkSearchResults />
      <Footer />
    </>
  );
}
