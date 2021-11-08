import React from 'react';
import Header from '../components/Header';
import DrinkSearchResults from '../components/DrinkSearchResults';

export default function Bebidas() {
  return (
    <>
      <Header title="Bebidas" profile search />
      <DrinkSearchResults />
    </>
  );
}
