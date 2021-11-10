import PropTypes from 'prop-types';
import React, { useState } from 'react';
import FoodContext from './FoodContext';
import fetchArea from '../helper/fetchArea';
import fetchFoodAPI from '../helper/fetchFoodAPI';
import fetchIngredients from '../helper/fetchIngredients';

export default function FoodProvider({ children }) {
  const [area, setArea] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredFood, setFilteredFood] = useState([]);
  const [foodIngredients, setFoodIngredients] = useState([]);
  const [loadingIngredients, setLoadingIngredients] = useState(false);

  const fetchByArea = async () => {
    const MAX_AREA = 99;
    const response = await fetchArea();
    const areaSlice = await response.slice(0, MAX_AREA);

    setArea(areaSlice);
    setLoading(false);

    return areaSlice;
  };

  const fetchIngredientsAPI = async () => {
    const MAX_INGREDIENTS = 12;
    const response = await fetchIngredients('food');
    const ingredientsSlice = await response.slice(0, MAX_INGREDIENTS);

    setFoodIngredients(ingredientsSlice);
    setLoadingIngredients(false);

    return ingredientsSlice;
  };

  const fetchFood = async (radio, input) => {
    const MAX_RECIPES = 12;
    const filtered = await fetchFoodAPI(radio, input);
    const filteredSlice = await filtered ? filtered.slice(0, MAX_RECIPES) : [];

    setFilteredFood(filteredSlice);
    setLoading(false);

    return filtered;
  };

  const foodContextValues = {
    loading,
    setLoading,
    filteredFood,
    fetchFood,
    loadingIngredients,
    setLoadingIngredients,
    fetchIngredientsAPI,
    fetchByArea,
    area,
    foodIngredients,
  };

  return (
    <FoodContext.Provider value={ foodContextValues }>
      { children }
    </FoodContext.Provider>
  );
}

FoodProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
