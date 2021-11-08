import PropTypes from 'prop-types';
import React, { useState } from 'react';
import FoodContext from './FoodContext';
import fetchFoodAPI from '../helper/fetchFoodAPI';

export default function FoodProvider({ children }) {
  const [loadingFood, setLoadingFood] = useState(false);
  const [filteredFood, setFilteredFood] = useState([]);

  const fetchFood = async (radio, input) => {
    const MAX_RECIPES = 12;
    const filtered = await fetchFoodAPI(radio, input);
    const filteredSlice = await filtered ? filtered.slice(0, MAX_RECIPES) : [];

    setFilteredFood(filteredSlice);
    setLoadingFood(false);

    return filtered;
  };

  const foodContextValues = { loadingFood, setLoadingFood, filteredFood, fetchFood };

  return (
    <FoodContext.Provider value={ foodContextValues }>
      { children }
    </FoodContext.Provider>
  );
}

FoodProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
