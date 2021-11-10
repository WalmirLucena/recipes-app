import React from 'react';
import { Link } from 'react-router-dom';
import drinkIMG from '../images/drinkIcon.svg';
import exploreIMG from '../images/exploreIcon.svg';
import foodIMG from '../images/mealIcon.svg';

export default function Footer() {
  return (
    <footer data-testid="footer" style={ { position: 'fixed', bottom: 0 } }>
      <Link to="/bebidas">
        <button type="button">
          <img src={ drinkIMG } alt="Drink" data-testid="drinks-bottom-btn" />
        </button>
      </Link>
      <Link to="/explorar">
        <button type="button">
          <img src={ exploreIMG } alt="Explore" data-testid="explore-bottom-btn" />
        </button>
      </Link>
      <Link to="/comidas">
        <button type="button">
          <img src={ foodIMG } alt="Foods" data-testid="food-bottom-btn" />
        </button>
      </Link>
    </footer>
  );
}
