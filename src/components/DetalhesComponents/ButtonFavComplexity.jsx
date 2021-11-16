import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

export default function ButtonFavComplexity({ recipeReformed }) {
  const { pathname } = useLocation();
  const [favIcon, setFavIcon] = useState(false);

  const idPathname = pathname.match(/\d+((.|,)\d+)?/)[0];

  const favoriteClick = () => {
    const localFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    // console.log(localFavorites)
    if (localFavorites !== null) {
      const ternario = localFavorites.find((e) => e.id === idPathname);
      if (ternario !== undefined) {
        const result = localFavorites.filter((e) => e.id !== idPathname);
        // console.log(result);
        localStorage.setItem('favoriteRecipes', JSON.stringify(result));
        setFavIcon(false);
      } else {
        const obj = [
          ...localFavorites,
          recipeReformed,
        ];
        localStorage.setItem('favoriteRecipes', JSON.stringify(obj));
        setFavIcon(true);
      }
    } else if (localFavorites === null) {
      const obj = [
        recipeReformed,
      ];
      localStorage.setItem('favoriteRecipes', JSON.stringify(obj));
      setFavIcon(true);
    }
  };

  const favoriteIcon = () => {
    const localFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    let ternario = [];
    if (localFavorites) {
      ternario = localFavorites.find((e) => e.id === idPathname);
      if (ternario !== null && ternario !== undefined) {
        setFavIcon(true);
      } else if (ternario === undefined) {
        setFavIcon(false);
      }
    }
  };

  useEffect(() => {
    favoriteIcon();
  }, []);

  return (
    <button
      type="button"
      onClick={ favoriteClick }
    >
      {favIcon
        ? <img src={ blackHeartIcon } alt="blackIcon" data-testid="favorite-btn" />
        : <img src={ whiteHeartIcon } alt="whiteIcon" data-testid="favorite-btn" />}
    </button>
  );
}

ButtonFavComplexity.propTypes = {
  recipeReformed: PropTypes.objectOf(PropTypes.any).isRequired,
};
