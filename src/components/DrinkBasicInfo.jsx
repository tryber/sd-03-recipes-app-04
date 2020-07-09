import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ContextAplication } from '../context/ContextAplication';
import background from '../images/loginbackground.jpg';

function renderRecomendations(recomendation) {
  return (
    <div>
      <h3>Recomedações</h3>
      <div className="product-pic-recomendation">
        {recomendation.reduce((arr, e, i) => {
          if (i < 6) {
            return [...arr,
              <Link to={`/comidas/${e.idMeal}`}>
                <div data-testid={`${i}-recomendation-card`}>
                  <img
                    src={e.strMealThumb}
                    data-testid="recipe-photo"
                    alt="thumbnail"
                    width="200px"
                  />
                  <h5 data-testid={`${i}-recomendation-title`}>{e.strMeal}</h5>
                </div>
              </Link>,
            ];
          }
          return arr;
        }, [])}
      </div>
    </div>
  );
}

function BasicInfo() {
  const {
    recipeInfo, recomendation,
  } = useContext(ContextAplication);
  const quantity = Object.keys(recipeInfo).filter((e) => e.includes('strIngredient'));
  const ingredients = (Object.keys(recipeInfo).filter((e) => e.includes('strMeasure')));
  return (
    <div className="basic-info">
      <img src={background} className="background-img" alt="background" />
      <div className="wrapper">
        <div className="square" />
        <img src={recipeInfo.strDrinkThumb} data-testid="recipe-photo" alt="thumb" width="100%" />
      </div>
      <h1 data-testid="recipe-title">{recipeInfo.strDrink}</h1>
      <h2 data-testid="recipe-category">{recipeInfo.strAlcoholic}</h2>
      <h3>Ingredientes</h3>
      {quantity.reduce((arr, e, i) => {
        if (recipeInfo[e] !== null) {
          return ([...arr, (
            <div data-testid={`${i}-ingredient-name-and-measure`}>
              <span>{recipeInfo[ingredients[i]]}</span>
              <span>{recipeInfo[e]}</span>
            </div>)]
          );
        } return arr;
      }, [])}
      <h3>Instruções</h3>
      <p data-testid="instructions">{recipeInfo.strInstructions}</p>
      {renderRecomendations(recomendation)}
    </div>
  );
}

export default BasicInfo;
