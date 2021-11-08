import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import FoodContext from './FoodContext';
import fetchFoodAPI from '../helper/fetchFoodAPI';

export default function FoodProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [filteredFood, setFilteredFood] = useState([]);

  const fetchFood = async (radio, input) => {
    const MAX_RECIPES = 12;
    const filtered = await fetchFoodAPI(radio, input);
    const filteredSlice = await filtered ? filtered.slice(0, MAX_RECIPES) : [];

    setFilteredFood(filteredSlice);
    setLoading(false);

    return filtered;
  };

  useEffect(() => {
    fetchFood('nome', 'a');
  }, []);

  const foodContextValues = { loading, setLoading, filteredFood, fetchFood };

  return (
    <FoodContext.Provider value={ foodContextValues }>
      { children }
    </FoodContext.Provider>
  );
}

FoodProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
