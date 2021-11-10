import PropTypes from 'prop-types';
import React, { useState } from 'react';
import DrinkContext from './DrinkContext';
import fetchDrinkAPI from '../helper/fetchDrinkAPI';
import fetchIngredients from '../helper/fetchIngredients';

export default function DrinkProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [filteredDrink, setFilteredDrink] = useState([]);
  const [drinkIngredients, setDrinkIngredients] = useState([]);
  const [loadingIngredients, setLoadingIngredients] = useState(false);

  const fetchIngredientsAPI = async () => {
    const MAX_INGREDIENTS = 12;
    const response = await fetchIngredients('drink');
    const ingredientsSlice = await response.slice(0, MAX_INGREDIENTS);

    setDrinkIngredients(ingredientsSlice);
    setLoadingIngredients(false);

    return ingredientsSlice;
  };

  const fetchDrink = async (radio, input) => {
    const MAX_RECIPES = 12;
    const filtered = await fetchDrinkAPI(radio, input);
    const filteredSlice = await filtered ? filtered.slice(0, MAX_RECIPES) : [];

    setFilteredDrink(filteredSlice);
    setLoading(false);

    return filtered;
  };

  const drinkContextValue = {
    loading,
    setLoading,
    filteredDrink,
    fetchDrink,
    loadingIngredients,
    setLoadingIngredients,
    fetchIngredientsAPI,
    drinkIngredients,
  };

  return (
    <DrinkContext.Provider value={ drinkContextValue }>
      { children }
    </DrinkContext.Provider>
  );
}

DrinkProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
