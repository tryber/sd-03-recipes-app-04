import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import InferiorMenu from './InferiorMenu';
import './CSS/ExploreHomeScreen.css';

function ExploreDrinkScreen() {
  return (
    <div className="explore-screen">
      <Header screen={"Explorar Bebidas"}/>
        <Link to="/explorar/bebidas/ingredientes">
          <p className="explore-food-button" data-testid="explore-by-ingredient">Por Ingredientes</p>
        </Link>
        <Link to="/explorar">
          <p className="explore-food-button" data-testid="explore-surprise">Me Surpreenda!</p>
        </Link>
      <InferiorMenu />
    </div>
  );
}

export default ExploreDrinkScreen;
