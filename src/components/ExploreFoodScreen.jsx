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
  };

  return (
    <div className="explore-screen">
      <Header screen={'Explorar Comidas'} />
      <Link to="/explorar/comidas/ingredientes">
        <button
          className="explore-food-button fade-in-fwd"
          data-testid="explore-by-ingredient"
        >Por Ingredientes</button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button
          className="explore-food-button fade-in-fwd"
          data-testid="explore-by-area"
        >Por Local de Origem</button>
      </Link>
      <button
        className="explore-food-button fade-in-fwd"
        data-testid="explore-surprise"
        onClick={handleClick}
      >Me Surpreenda!</button>
      {id !== '' && <Redirect to={`/comidas/${id}`} />}
      <InferiorMenu />
    </div>
  );
}

export default ExploreFoodScreen;
