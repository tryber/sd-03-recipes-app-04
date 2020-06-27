import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import ReactPlayer from 'react-player';
// import CopyToClipboard from './CopyToClipboard';
import { getMealById } from '../services/foodApi';
import { getFirstDrinks } from '../services/drink-api';
import share from '../images/shareIcon.svg';
import notFavorite from '../images/whiteHeartIcon.svg';
import favorite from '../images/blackHeartIcon.svg';

function copyToClipboard() {
  // precisa fazer o clipboard
  window.alert(window.location.href);
}

function changeRecipeStatus(setHasStarted, recipeInfo, hasStarted, setGoToRoute) {
  setGoToRoute(true);
  setHasStarted(true);
  const {
    idMeal, strType, strArea, strCategory, strMeal, strMealThumb,
  } = recipeInfo;
  const mealInfo = {
    id: idMeal,
    type: strType,
    area: strArea.strArea,
    category: strCategory,
    alcoholicOrNor: undefined,
    name: strMeal,
    image: strMealThumb,
    doneDate: undefined,
    tags: undefined,
  };
  if (!hasStarted) {
    let storage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (!storage) {
      storage = [];
    }
    const newStorage = [...storage, mealInfo];
    localStorage.setItem('doneRecipes', JSON.stringify(newStorage));
  }
}

function clickFavorite(setIsFavorite, recipeInfo, isfavorite) {
  setIsFavorite((isFavorite) => !isFavorite);
  const {
    idMeal, strType, strArea, strCategory, strMeal, strMealThumb,
  } = recipeInfo;
  const mealInfo = {
    id: idMeal,
    type: strType,
    area: strArea.strArea,
    category: strCategory,
    name: strMeal,
    image: strMealThumb,
  };
  if (!isfavorite) {
    let storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!storage) {
      storage = [];
    }
    const newStorage = [...storage, mealInfo];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
  }
  if (isfavorite) {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newStorage = storage.filter((e) => !e.id === idMeal);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
  }
}

export default function (props) {
  const { id } = props.props.match.params;
  const storage = JSON.parse(localStorage.getItem('doneRecipes'));
  let started;
  let done;
  if (!storage) {
    started = false;
  } else {
    started = storage.find((e) => e.id === id);
    done = storage.find((e) => e.doneDate !== undefined);
  }

  const [recipeInfo, setRecipeInfo] = useState([]);
  const [recomendation, setRecomendation] = useState([]);
  const [hasStarted, setHasStarted] = useState(false);
  const [goToRoute, setGoToRoute] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getMealById(id).then((data) => {
      setRecipeInfo(data.meals[0]);
      setIsLoading(false);
    });
    getFirstDrinks().then((data) => setRecomendation(data.drinks));
  }, []);
  const quantity = Object.keys(recipeInfo).filter((e) => e.includes('strIngredient'));
  const ingredientes = Object.keys(recipeInfo).filter((e) => e.includes('strMeasure'));
  return (
    <div>
      {isLoading && <h1>Carregando...</h1>}
      {!isLoading && (
        <div>
          <img src={recipeInfo.strMealThumb} alt="thumb" width="100%" />
          <h1>{recipeInfo.strMeal}</h1>
          <h2>{recipeInfo.strCategory}</h2>
          {console.log(recipeInfo)}
          <h3>Ingredientes</h3>
          {quantity.map((e, i) => (
            <div>
              <span>{recipeInfo[ingredientes[i]]}</span>
              <span>{recipeInfo[e]}</span>
            </div>
          ))}
          <h3>Instruções</h3>
          <p>{recipeInfo.strInstructions}</p>
          <ReactPlayer width="350px" height="200px" url={recipeInfo.strYoutube} />
          <h3>Recomedações</h3>
          <div className="product-pic-recomendation">
            {recomendation.reduce((arr, e, i) => {
              if (i < 6) {
                return [...arr,
                  <div>
                    <img src={e.strDrinkThumb} alt="thumbnail" width="150px" />
                    <h5>{e.strDrink}</h5>
                  </div>,
                ];
              }
              return arr;
            }, [])}
          </div>
          <div className="bottom-buttons">
            {!hasStarted && !done && !started && (
              <button
                type="button"
                onClick={() => changeRecipeStatus(setHasStarted, recipeInfo, hasStarted, setGoToRoute)}
                className="start-button"
              >
                Iniciar Receita
              </button>
            )}
            {started && !done && <button type="button" className="start-button">Continuar Receita</button>}
            <div className="share-and-favourite">
              <button type="button" className="favourite" onClick={() => clickFavorite(setIsFavorite, recipeInfo, isFavorite)}>{isFavorite ? <img src={favorite} /> : <img src={notFavorite} />}</button>
              <button type="button" className="favourite" onClick={() => copyToClipboard()}><img src={share} alt="icon" /></button>
            </div>
            {goToRoute && <Redirect to={`/comidas/${id}/in-progress`} />}
          </div>
        </div>
      )}
    </div>
  );
}
