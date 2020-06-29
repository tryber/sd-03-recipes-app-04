import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFirstMeals, getCategoriesList, getMealByCategorie } from '../services/foodApi';
import InferiorMenu from './InferiorMenu';
import './CSS/MainFoodScreen.css';

function FilterButtons(Categories, handleClick) {
  return (
    <div className="button-div">
      <button
        value="All"
        onClick={handleClick}className="button-main-screen"
        data-testid="All-category-filter"
      >All</button>
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
  const [Data, setData] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [Filter, setFilter] = useState('All');
  const [isLoading, setisLoading] = useState(false);

  const getMeals = () => {
    getFirstMeals()
      .then((answer) => setData(answer.meals));
  };

  useEffect(() => {
    setisLoading(true);
    getMeals();
    getCategoriesList()
      .then((answer) => setCategories(answer.categories));
    setisLoading(false);
  }, []);

  useEffect(() => {
    if (Filter === 'All') {
      getFirstMeals()
        .then((answer) => setData(answer.meals));
    } else {
      getMealByCategorie(Filter)
        .then((answer) => setData(answer.meals));
    }
  }, [Filter]);

  const handleClick = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className="food-screen">
      {isLoading && <div className="loader" />}
      {!isLoading && FilterButtons(Categories, handleClick)}
      {!isLoading && MealsList(Data)}
      <InferiorMenu />
    </div>
  );
}

export default MainFoodScreen;
