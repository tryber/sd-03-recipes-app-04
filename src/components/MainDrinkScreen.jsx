import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFirstDrinks, getListDrinksCategories, getDrinkByCategories } from '../services/drink-api';
import InferiorMenu from './InferiorMenu';
import './CSS/MainFoodScreen.css';
import Header from './Header';

function FilterButtons(Categories, handleClick) {
  return (
    <div>
      <div className="button-div">
        <button
          type="button"
          value="All"
          onClick={handleClick}
          className="button-main-screen"
        >
          All
        </button>
        {Categories.reduce((arr, e, i) => {
          if (i < 5) {
            return [...arr,
              <button
                type="button"
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
  const [isLoading, setisLoading] = useState(false);

  const getDrinks = () => {
    getFirstDrinks()
      .then((answer) => setData(answer.drinks));
  };

  useEffect(() => {
    setisLoading(true);
    getDrinks();
    getListDrinksCategories()
      .then((answer) => setCategories(answer.drinks));
    setisLoading(false);
  }, []);

  useEffect(() => {
    if (Filter === 'All') {
      getFirstDrinks()
        .then((answer) => setData(answer.drinks));
    } else {
      getDrinkByCategories(Filter)
        .then((answer) => setData(answer.drinks));
    }
  }, [Filter]);

  const handleClick = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className="food-screen">
      <Header screen={"Bebidas"} />
      {isLoading && <div className="loader" />}
      {!isLoading && FilterButtons(Categories, handleClick)}
      {!isLoading && DrinksList(Data)}
      <InferiorMenu />
    </div>
  );
}

export default MainFoodScreen;
