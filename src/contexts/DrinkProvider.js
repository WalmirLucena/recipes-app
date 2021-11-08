import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import DrinkContext from './DrinkContext';
import fetchDrinkAPI from '../helper/fetchDrinkAPI';

export default function DrinkProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [filteredDrink, setFilteredDrink] = useState([]);

  const fetchDrink = async (radio, input) => {
    const MAX_RECIPES = 12;
    const filtered = await fetchDrinkAPI(radio, input);
    const filteredSlice = await filtered ? filtered.slice(0, MAX_RECIPES) : [];

    setFilteredDrink(filteredSlice);
    setLoading(false);

    return filtered;
  };

  useEffect(() => {
    fetchDrink('nome', 'mojito');
  }, []);

  const drinkContextValue = { loading, setLoading, filteredDrink, fetchDrink };

  return (
    <DrinkContext.Provider value={ drinkContextValue }>
      { children }
    </DrinkContext.Provider>
  );
}

DrinkProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
