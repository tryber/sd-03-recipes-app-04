import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getCategoriesList, getMealByCategorie } from '../services/foodApi';
import { ContextAplication } from '../context/ContextAplication';
import InferiorMenu from './InferiorMenu';
import Header from './Header';
import './CSS/MainFoodScreen.css';
import chicken from '../images/chicken.svg';
import beef from '../images/beef.svg';
import goat from '../images/goat.svg';
import dessert from '../images/dessert.svg';
import breakfast from '../images/breakfast.svg';
import filter from '../images/filter.svg';

const filterPics = [beef, breakfast, chicken, dessert, goat];

export function renderButtons(category, handleClick, i, pics) {
  return (
    <button
      type="button"
      data-testid={`${category}-category-filter`}
      value={category}
      onClick={handleClick}
      className="button-main-screen"
    >
      <img src={pics[i]} width="20px" alt="pic" />
      {category}
    </button>
  );
}

function FilterButtons(Categories, handleClick) {
  return (
    <div className="button-div">
      <button
        data-testid="All-category-filter"
        type="button"
        value="All"
        onClick={handleClick}
        className="button-main-screen"
      >
        <img src={filter} width="20px" alt="filter" />
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
  );
}

function MealsList(Data) {
  return (
    <div className="recipes-results">
      {Data.reduce((arr, e, i) => {
        if (i < 12) {
          return [...arr,
            <Link to={`/comidas/${e.idMeal}`}>
              <div
                className={`product-pic-${i} product-pic`}
                data-testid={`${i}-recipe-card`}
              >
                <img src={e.strMealThumb} className="recipe-image" alt="thumbnail" width="120px" data-testid={`${i}-card-img`} />
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
    setData,
    searchInputVisible,
    setingredientFilter,
  } = useContext(ContextAplication);
  const [Categories, setCategories] = useState([]);
  const [FoodFilter, setFoodFilter] = useState('All');
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    setisLoading(true);
    getMeals();
    getCategoriesList()
      .then((answer) => setCategories(answer.meals));
    setisLoading(false);
    return () => {
      setingredientFilter('');
    };
  }, []);

  useEffect(() => {
    if (FoodFilter === 'All') {
      getMeals();
    } else {
      getMealByCategorie(FoodFilter)
        .then((answer) => setData(answer.meals));
    }
  }, [FoodFilter]);

  const handleClick = (event) => {
    if (event.target.value !== FoodFilter) {
      setFoodFilter(event.target.value);
    } else {
      setFoodFilter('All');
    }
  };

  return (
    <div className="food-screen">
      <Header screen="Comidas" />
      {isLoading && <div className="loader" />}
      {!isLoading && !searchInputVisible && FilterButtons(Categories, handleClick)}
      {!isLoading && !searchInputVisible && MealsList(Data)}
      <InferiorMenu />
    </div>
  );
}

export default MainFoodScreen;
