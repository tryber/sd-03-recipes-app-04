import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFirstDrinks, getListDrinksCategories } from '../services/drink-api';
import InferiorMenu from './InferiorMenu';
import './CSS/MainFoodScreen.css';

function FilterButtons(Categories, handleClick) {
  return (
    <div className="button-div">
      <button value="All" onClick={handleClick} className="button-main-screen">All</button>
      {Categories.reduce((arr, e, i) => {
        if (i < 5) {
          return [...arr,
            <button
              data-testid={`${e.strCategory}-category-filter`}
              value={e.strCategory}
              onClick={handleClick}
              className="button-main-screen"
            >
              {e.strCategory}
            </button>,
          ];
        }
        return arr;
      }, [])}
    </div>
  );
}

function DrinksList(Data) {
  return (
    <div className="recipes-results">
      {Data.reduce((arr, e, i) => {
        if (i < 12) {
          return [...arr,
            <Link to={`/bebidas/${e.idDrink}`}>
              <div className="product-pic">
                <img src={e.strDrinkThumb} alt="thumbnail" width="150px" />
                <h5>{e.strDrink}</h5>
              </div>
            </Link>,
          ];
        }
        return arr;
      }, [])}
    </div>
  );
}

function MainFoodScreen() {
  const [Data, setData] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [Filter, setFilter] = useState('All');

  const getDrinks = () => {
    getFirstDrinks()
      .then((answer) => setData(answer.drinks));
  };

  useEffect(() => {
    getDrinks();
    getListDrinksCategories()
      .then((answer) => setCategories(answer.drinks));
  }, []);

  useEffect(() => {
    getFirstDrinks()
      .then((answer) => {
        if (Filter !== 'All') {
          setData(answer.drinks.filter((drink) => drink.strCategory === Filter));
        } else {
          getDrinks();
        }
      });
  }, [Filter]);

  const handleClick = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className="food-screen">
      {FilterButtons(Categories, handleClick)}
      {DrinksList(Data)}
      <InferiorMenu />
    </div>
  );
}

export default MainFoodScreen;
