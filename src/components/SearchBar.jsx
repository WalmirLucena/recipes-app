import React, { useState, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import DrinkContext from '../contexts/DrinkContext';
import FoodContext from '../contexts/FoodContext';
import '../styles/SearchBar.css';

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const [searchType, setSearchType] = useState('');
  const { fetchFood } = useContext(FoodContext);
  const { fetchDrink, setLoadingDrink } = useContext(DrinkContext);

  const { pathname } = useLocation();
  const history = useHistory();

  const handleSearch = async () => {
    const LETTER_ERROR = 'Sua busca deve conter somente 1 (um) caracter';
    const NOT_FOUND = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';

    if (searchType === 'letra' && searchInput.length !== 1) global.alert(LETTER_ERROR);

    if (pathname.includes('/comidas')) {
      setLoadingDrink(true);

      const recipes = await fetchFood(searchType, searchInput);
      if (!recipes) {
        global.alert(NOT_FOUND);
      } else if (recipes.length === 1) history.push(`/comidas/${recipes[0].idMeal}`);
    }

    if (pathname.includes('/bebidas')) {
      setLoadingDrink(true);

      const recipes = await fetchDrink(searchType, searchInput);
      if (!recipes) {
        global.alert(NOT_FOUND);
      } else if (recipes.length === 1) history.push(`/bebidas/${recipes[0].idDrink}`);
    }
  };

  return (
    <form className="searchbar-form">
      <div className="text-input">
        <label htmlFor="search-bar">
          <input
            id="search-bar"
            type="text"
            className="search-input"
            placeholder="Buscar Receita"
            value={ searchInput }
            onChange={ (e) => setSearchInput(e.target.value) }
            data-testid="search-input"
          />
        </label>
      </div>
      <div className="radio-container">
        <label htmlFor="ingrediente" className="label-radio">
          <input
            id="ingrediente"
            type="radio"
            name="type"
            value="ingrediente"
            onChange={ (e) => setSearchType(e.target.value) }
            data-testid="ingredient-search-radio"
            className="input-radio"
          />
          Ingrediente
        </label>
        <label htmlFor="nome" className="label-radio">
          <input
            id="nome"
            type="radio"
            name="type"
            value="nome"
            onChange={ (e) => setSearchType(e.target.value) }
            data-testid="name-search-radio"
            className="input-radio"
          />
          Nome
        </label>
        <label htmlFor="primeira-letra" className="label-radio">
          <input
            id="primeira-letra"
            type="radio"
            name="type"
            value="letra"
            onChange={ (e) => setSearchType(e.target.value) }
            data-testid="first-letter-search-radio"
            className="input-radio"
          />
          Primeira letra
        </label>

      </div>
      <button
        type="button"
        className="exec-search-btn"
        onClick={ handleSearch }
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </form>
  );
}
