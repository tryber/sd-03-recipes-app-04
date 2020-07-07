import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ContextAplication } from '../context/ContextAplication';
import { getAreaList, getMealByArea } from '../services/foodApi';
import InferiorMenu from './InferiorMenu';
import Header from './Header';
import './CSS/MainFoodScreen.css';

function MealsList(Data) {
  return (
    <div className="recipes-results">
      {Data.reduce((arr, e, i) => {
        if (i < 12) {
          return [...arr,
            <Link to={`/comidas/${e.idMeal}`}>
              <div className={`product-pic product-pic-${i} slide-in-fwd-center`} data-testid={`${i}-recipe-card`}>
                <img
                  className="recipe-image"
                  src={e.strMealThumb}
                  alt="thumbnail"
                  width="120px"
                  data-testid={`${i}-card-img`}
                />
                <h5 data-testid={`${i}-card-name`}>{(e.strMeal.length > 30) ? `${e.strMeal.slice(0, 30)}...` : e.strMeal}</h5>
              </div>
            </Link>,
          ];
        }
        return arr;
      }, [])}
    </div>
  );
}

function renderAreaFilter(areas, setAreaFilter, areaFilter, setMealsByArea) {
  return (
    <select
      className="select-filter"
      data-testid="explore-by-area-dropdown"
      onChange={(e) => {
        getMealByArea(e.target.value).then((data) => setMealsByArea(data.meals));
        setAreaFilter(e.target.value);
      }}
      value={areaFilter}
    >
      {areas.map((e) => (
        <option
          data-testid={`${e.strArea}-option`}
          value={e.strArea}
        >
          {e.strArea}
        </option>
      ))}
      <option data-testid="All-option" value="All">All</option>
    </select>
  );
}

function ShowResultsByArea(Data, mealsByArea, areaFilter) {
  if (areaFilter !== 'All') {
    return (
      <div className="recipes-results">
        {mealsByArea.reduce((arr, e, i) => {
          if (i < 12) {
            return [...arr,
              <Link to={`/comidas/${e.idMeal}`}>
                <div className={`product-pic product-pic-${i} slide-in-fwd-center`} data-testid={`${i}-recipe-card`}>
                  <img
                    className="recipe-image"
                    src={e.strMealThumb}
                    alt="thumbnail"
                    width="120px"
                    data-testid={`${i}-card-img`}
                  />
                  <h5 data-testid={`${i}-card-name`}>{(e.strMeal.length > 30) ? `${e.strMeal.slice(0, 30)}...` : e.strMeal}</h5>
                </div>
              </Link>,
            ];
          }
          return arr;
        }, [])}
      </div>
    );
  }
  return MealsList(Data);
}

export default function ExploreFoodOriginScreen() {
  const {
    Data,
    getMeals,
    searchInputVisible,
  } = useContext(ContextAplication);
  const [isLoading, setisLoading] = useState(false);
  const [areas, setAreas] = useState([]);
  const [areaFilter, setAreaFilter] = useState('All');
  const [mealsByArea, setMealsByArea] = useState([]);

  useEffect(() => {
    setisLoading(true);
    getMeals();
    setisLoading(false);
    getAreaList().then((data) => setAreas(data.meals));
  }, []);

  return (
    <div>
      <div className="food-screen">
        <Header screen="Explorar Origem" />
        {isLoading && <div className="loader" />}
        {!isLoading && !searchInputVisible}
        {renderAreaFilter(areas, setAreaFilter, areaFilter, setMealsByArea)}
        {!isLoading && ShowResultsByArea(Data, mealsByArea, areaFilter)}
        <InferiorMenu />
      </div>
    </div>
  );
}
