import React, { useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { getRandomDrink } from '../services/drink-api';
import Header from './Header';
import InferiorMenu from './InferiorMenu';
import './CSS/ExploreHomeScreen.css';

function ExploreDrinkScreen() {
  const [id, setId] = useState('');

  const handleClick = () => {
    getRandomDrink()
      .then((answer) => setId(answer.drinks[0].idDrink));
  }
  return (
    <div className="explore-screen">
      <Header screen={"Explorar Bebidas"}/>
        <Link to="/explorar/bebidas/ingredientes">
          <p className="explore-food-button" data-testid="explore-by-ingredient">Por Ingredientes</p>
        </Link>
        <p
          className="explore-food-button" data-testid="explore-surprise"
          onClick={handleClick}
        >Me Surpreenda!</p>
        {id !== '' && <Redirect to={`/bebidas/${id}`} />}
      <InferiorMenu />
    </div>
  );
}

export default ExploreDrinkScreen;
