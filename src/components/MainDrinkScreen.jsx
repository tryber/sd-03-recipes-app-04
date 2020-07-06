import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getListDrinksCategories, getDrinkByCategories } from '../services/drink-api';
import { ContextAplication } from '../context/ContextAplication';
import InferiorMenu from './InferiorMenu';
import './CSS/MainFoodScreen.css';
import Header from './Header';
import ordinary from '../images/ordinary.svg';
import cocktail from '../images/cocktail.svg';
import cocoa from '../images/cocoa.svg';
import unknown from '../images/unknown.svg';
import shake from '../images/shake.svg';
import filter from '../images/filter.svg';
import { renderButtons } from './MainFoodScreen';

const filterPics = [ordinary, cocktail, shake, unknown, cocoa];

function FilterButtons(Categories, handleClick) {
  return (
    <div>
      <div className="button-div">
        <button
          data-testid="All-category-filter"
          type="button"
          value="All"
          onClick={(e) => handleClick(e)}
          className="button-main-screen"
        >
          <img src={filter} alt="filter" width="20px" />
          All
        </button>
        {Categories.reduce((arr, e, i) => {
          if (i < 5) {
            return [...arr,
              renderButtons(e.strCategory, handleClick, i, filterPics),
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
              <div className={`product-pic-${i} product-pic`} data-testid={`${i}-recipe-card`}>
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

function MainDrinkScreen() {
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
      <Header screen="Bebidas" />
      {isLoading && <div className="loader" />}
      {!isLoading && !searchInputVisible && FilterButtons(Categories, handleClick)}
      {!isLoading && !searchInputVisible && DrinksList(Data)}
      <InferiorMenu />
    </div>
  );
}

export default MainDrinkScreen;
