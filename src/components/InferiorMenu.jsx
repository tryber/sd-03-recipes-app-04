import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './CSS/InferiorMenu.css';

function InferiorMenu() {
  return (
    <div className="inferior-menu-icons">
      <Link to="/bebidas"><img src={drinkIcon} alt="drink" /></Link>
      <Link to="/explorar"><img src={exploreIcon} alt="explore" /></Link>
      <Link to="/comidas"><img src={mealIcon} alt="meal" /></Link>
    </div>
  );
}

export default InferiorMenu;