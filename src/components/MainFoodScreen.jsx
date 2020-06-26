import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFirstMeals, getCategoriesList } from '../services/foodApi';
import './CSS/MainFoodScreen.css';

function FilterButtons(Categories, handleClick) {
  return (
    <div>
      <button value="All" onClick={handleClick}>All</button>
      {Categories.reduce((arr, e, i) => {
        if (i < 5) {
          return [...arr,
          <button
            data-testid={`${e.strCategory}-category-filter`}
            value={e.strCategory}
            onClick={handleClick}
          >
            {e.strCategory}
          </button>
          ];
        }
        return arr;
      }, [])}
    </div>
  )
};

function MealsList(Data) {
  return (
    <div className="recipes-results">
      {Data.reduce((arr, e, i) => {
        if (i < 12) {
          return [...arr,
          <Link to={`/comidas/${e.idMeal}`}>
            <div className="product-pic">
              <img src={e.strMealThumb} alt="thumbnail" width="150px" />
              <h5>{e.strMeal}</h5>
            </div>
          </Link>,
          ];
        }
        return arr;
      }, [])}
    </div>
  )
};

function MainFoodScreen() {
  const [Data, setData] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [Filter, setFilter] = useState('All');

  const getMeals = () => {
    getFirstMeals()
      .then((answer) => setData(answer.meals));
  }

  useEffect(() => {
    getMeals();
    getCategoriesList()
      .then((answer) => setCategories(answer.categories));
  }, []);

  useEffect(() => {
    getFirstMeals()
      .then((answer) => {
        if (Filter !== 'All') {
          setData(answer.meals.filter((meal) => meal.strCategory === Filter));
        } else {
          getMeals();
        }
      });
  }, [Filter]);

  const handleClick = (event) => {
    setFilter(event.target.value);
  }

  return (
    <div className="food-screen">
      {FilterButtons(Categories, handleClick)}
      {MealsList(Data)}
    </div>
  );
}

export default MainFoodScreen;