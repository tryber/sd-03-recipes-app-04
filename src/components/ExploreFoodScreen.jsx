import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { getRandomMeal } from '../services/foodApi';
import Header from './Header';
import InferiorMenu from './InferiorMenu';
import './CSS/ExploreHomeScreen.css';

function ExploreFoodScreen() {
  const [id, setId] = useState('');

  const handleClick = () => {
    getRandomMeal()
      .then((answer) => setId(answer.meals[0].idMeal));
  }

  return (
    <div className="explore-screen">
      <Header screen={'Explorar Comidas'} />
      <Link to="/explorar/comidas/ingredientes">
        <div className="explore-food-button" data-testid="explore-by-ingredient">Por Ingredientes</div>
      </Link>
      <Link to="/explorar/comidas/area">
        <div className="explore-food-button" data-testid="explore-by-area">Por Local de Origem</div>
      </Link>
      <div
        className="explore-food-button"
        data-testid="explore-surprise"
        onClick={handleClick}
      >Me Surpreenda!</div>
      {id !== '' && <Redirect to={`/comidas/${id}`} />}
      <InferiorMenu />
    </div>
  );
}

export default ExploreFoodScreen;
