import PropTypes from 'prop-types';
import React from 'react';
import MealContext from './MealContext';

export default function MealProvider({ children }) {
  const mealContextValue = { value: 3 };

  return (
    <MealContext.Provider value={ mealContextValue }>
      { children }
    </MealContext.Provider>
  );
}

MealProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
