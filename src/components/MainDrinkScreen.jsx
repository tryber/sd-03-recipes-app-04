import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getListDrinksCategories, getDrinkByCategories } from '../services/drink-api';
import { ContextAplication } from '../context/ContextAplication';
import InferiorMenu from './InferiorMenu';
import './CSS/MainFoodScreen.css';
import Header from './Header';

function FilterButtons(Categories, handleClick) {
  return (
    <div>
      <div className="button-div">
        <button
          data-testid="All-category-filter"
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
              <div className="product-pic" data-testid={`${i}-recipe-card`}>
                <img src={e.strDrinkThumb} alt="thumbnail" width="150px" data-testid={`${i}-card-img`} />
                <h5 data-testid={`${i}-card-name`}>{e.strDrink}</h5>
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
  const {
    Data,
    getDrinks,
    updateDrinks,
    searchInputVisible,
    changeIngredientFilter,
  } = useContext(ContextAplication);
  const [Categories, setCategories] = useState([]);
  const [Filter, setFilter] = useState('All');
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    setisLoading(true);
    getDrinks();
    getListDrinksCategories()
      .then((answer) => setCategories(answer.drinks));
    setisLoading(false);
    return () => {
      changeIngredientFilter('')
    }
  }, []);

  useEffect(() => {
    if (Filter === 'All') {
      getDrinks();
    } else {
      getDrinkByCategories(Filter)
        .then((answer) => updateDrinks(answer.drinks));
    }
  }, [Filter]);

  const handleClick = (event) => {
    event.target.value !== Filter ? setFilter(event.target.value) : setFilter('All');
  };

  return (
    <div className="food-screen">
      <Header screen={'Bebidas'} />
      {isLoading && <div className="loader" />}
      {!isLoading && FilterButtons(Categories, handleClick)}
      {!isLoading && DrinksList(Data)}
      <InferiorMenu />
    </div>
  );
}

export default MainFoodScreen;
