import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getCategoriesList, getMealByCategorie } from '../services/foodApi';
import { ContextAplication } from '../context/ContextAplication';
import InferiorMenu from './InferiorMenu';
import Header from './Header';
import './CSS/MainFoodScreen.css';

function FilterButtons(Categories, handleClick) {
  return (
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
  );
}

function MealsList(Data) {
  return (
    <div className="recipes-results">
      {Data.reduce((arr, e, i) => {
        if (i < 12) {
          return [...arr,
            <Link to={`/comidas/${e.idMeal}`}>
              <div className="product-pic" data-testid={`${i}-recipe-card`}>
                <img src={e.strMealThumb} alt="thumbnail" width="150px" data-testid={`${i}-card-img`} />
                <h5 data-testid={`${i}-card-name`}>{e.strMeal}</h5>
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
    getMeals,
    updateMeals,
    searchInputVisible,
  } = useContext(ContextAplication);
  const [Categories, setCategories] = useState([]);
  const [Filter, setFilter] = useState('All');
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    setisLoading(true);
    getMeals();
    getCategoriesList()
      .then((answer) => setCategories(answer.meals));
    setisLoading(false);
  }, []);

  useEffect(() => {
    if (Filter === 'All') {
      getMeals();
    } else {
      getMealByCategorie(Filter)
        .then((answer) => updateMeals(answer.meals));
    }
  }, [Filter]);

  const handleClick = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <div className="food-screen">
        <Header screen={"Comidas"} />
        {isLoading && <div className="loader" />}
        {!isLoading && !searchInputVisible && FilterButtons(Categories, handleClick)}
        {!isLoading && MealsList(Data)}
        <InferiorMenu />
      </div>
    </div>
  );
}

export default MainFoodScreen;
