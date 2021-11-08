import PropTypes from 'prop-types';
import React, { useState } from 'react';
import DrinkContext from './DrinkContext';
import fetchDrinkAPI from '../helper/fetchDrinkAPI';

export default function DrinkProvider({ children }) {
  const [loadingDrink, setLoadingDrink] = useState(false);
  const [filteredDrink, setFilteredDrink] = useState([]);

  const fetchDrink = async (radio, input) => {
    const MAX_RECIPES = 12;
    const filtered = await fetchDrinkAPI(radio, input);
    const filteredSlice = await filtered ? filtered.slice(0, MAX_RECIPES) : [];

    setFilteredDrink(filteredSlice);
    setLoadingDrink(false);

    return filtered;
  };

  const drinkContextValue = { loadingDrink, setLoadingDrink, filteredDrink, fetchDrink };

  return (
    <DrinkContext.Provider value={ drinkContextValue }>
      { children }
    </DrinkContext.Provider>
  );
}

DrinkProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
