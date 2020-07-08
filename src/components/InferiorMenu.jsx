import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './CSS/InferiorMenu.css';

function InferiorMenu() {
  return (
    <div className="inferior-menu-icons" data-testid="footer">
      <div>
        <Link to="/bebidas">
          <img
            src={drinkIcon}
            alt="drink"
            data-testid="drinks-bottom-btn"
          />
        </Link>
      </div>
      <div>
        <Link to="/explorar">
          <img
            src={exploreIcon}
            alt="explore"
            data-testid="explore-bottom-btn"
          />
        </Link>
      </div>
      <div>
        <Link to="/comidas">
          <img
            src={mealIcon}
            alt="meal"
            data-testid="food-bottom-btn"
          />
        </Link>
      </div>
    </div>
  );
}

export default InferiorMenu;
