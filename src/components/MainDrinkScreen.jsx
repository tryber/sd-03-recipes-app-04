import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getListDrinksCategories, getDrinkByCategories } from '../services/drink-api';
import { ContextAplication } from '../context/ContextAplication';
import InferiorMenu from './InferiorMenu';
import Header from './Header';
import './CSS/MainFoodScreen.css';
import chicken from '../images/chicken.svg';
import beef from '../images/beef.svg';
import goat from '../images/goat.svg';
import dessert from '../images/dessert.svg';
import breakfast from '../images/breakfast.svg';

const filterPics = [beef, breakfast, chicken, dessert, goat];

function FilterButtons(Categories, handleClick) {
  return (
    <div className="button-div">
      <button
        data-testid="All-category-filter"
        type="button"
        value="All"
        onClick={handleClick}
        className="button-main-screen"
        key="All"
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
              key={e.strCategory}
            >
              <img src={filterPics[i]} alt="" width="20px" />
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
              <div
                className={`product-pic-${i} product-pic slide-in-fwd-center`}
                data-testid={`${i}-recipe-card`}
                key={e.idDrink}
              >
                <img src={e.strDrinkThumb} className="recipe-image" alt="thumbnail" width="120px" data-testid={`${i}-card-img`} />
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
    setData,
    searchInputVisible,
    setingredientFilter,
  } = useContext(ContextAplication);
  const [Categories, setCategories] = useState([]);
  const [DrinkFilter, setDrinkFilter] = useState('All');
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    setisLoading(true);
    getDrinks();
    getListDrinksCategories()
      .then((answer) => setCategories(answer.drinks));
    setisLoading(false);
    return () => {
      setingredientFilter('');
    };
  }, []);

  useEffect(() => {
    if (DrinkFilter === 'All') {
      getDrinks();
    } else {
      getDrinkByCategories(DrinkFilter)
        .then((answer) => setData(answer.drinks));
    }
  }, [DrinkFilter]);

  const handleClick = (event) => {
    if (event.target.value !== DrinkFilter) {
      setDrinkFilter(event.target.value);
    } else {
      setDrinkFilter('All');
    }
  };

  return (
    <div className="food-screen">
      <Header screen={'Bebidas'} />
      {isLoading && <div className="loader" />}
      {!isLoading && !searchInputVisible && FilterButtons(Categories, handleClick)}
      {!isLoading && !searchInputVisible && DrinksList(Data)}
      <InferiorMenu />
    </div>
  );
}

export default MainFoodScreen;
