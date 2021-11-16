import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import DrinkContext from './DrinkContext';
import fetchDrinkAPI from '../helper/fetchDrinkAPI';
import fetchIngredients from '../helper/fetchIngredients';
import fetchCategoryDrinkAPI from '../helper/fetchCategoryDrinkAPI';
import fetchDrinkByCategory from '../helper/fetchDrinkByCategory';

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

  const [categoryDrink, setCategoryDrink] = useState([]);

  const fetchCategoryDrink = async () => {
    const MAX_RECIPES = 5;
    const category = await fetchCategoryDrinkAPI();
    const filteredCategory = await category ? category.drinks.slice(0, MAX_RECIPES) : [];
    setCategoryDrink(filteredCategory);
  };

  useEffect(() => {
    fetchCategoryDrink();
  }, []);


  const fetchDrink = async (radio, input) => {
    const MAX_RECIPES = 12;
    const filtered = await fetchDrinkAPI(radio, input);
    const filteredSlice = await filtered ? filtered.slice(0, MAX_RECIPES) : [];

    setFilteredDrink(filteredSlice);
    setLoading(false);

    return filtered;
  };

  const fetchInitialDrink = async () => {
    const MAX_RECIPES = 12;
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    const filtered = data ? data.drinks.slice(0, MAX_RECIPES) : [];
    setFilteredDrink(filtered);
  };

  useEffect(() => {
    fetchInitialDrink();
  }, []);

  const fetchByCategoryDrink = async (category) => {
    const MAX_RECIPES = 12;
    const filtered = await fetchDrinkByCategory(category);
    const filteredSlice = await filtered ? filtered.drinks.slice(0, MAX_RECIPES) : [];

    setFilteredDrink(filteredSlice);
    setLoading(false);

    return filtered;
  };

  const drinkContextValue = {
    loading,
    setLoading,
    filteredDrink,
    fetchDrink,s
    loadingIngredients,
    setLoadingIngredients,
    fetchIngredientsAPI,
    drinkIngredients,
    categoryDrink,
    fetchByCategoryDrink,
    fetchInitialDrink };

  return (
    <DrinkContext.Provider value={ drinkContextValue }>
      { children }
    </DrinkContext.Provider>
  );
}

DrinkProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
