import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import DrinkContext from './DrinkContext';
import fetchDrinkAPI from '../helper/fetchDrinkAPI';
import fetchCategoryDrinkAPI from '../helper/fetchCategoryDrinkAPI';

export default function DrinkProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [filteredDrink, setFilteredDrink] = useState([]);
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

  useEffect(() => {
    fetchDrink('letra', 'a');
  }, []);

  const drinkContextValue = {
    loading, setLoading, filteredDrink, fetchDrink, categoryDrink };

  return (
    <DrinkContext.Provider value={ drinkContextValue }>
      { children }
    </DrinkContext.Provider>
  );
}

DrinkProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
