import React, { useContext } from 'react';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import { ContextAplication } from '../context/ContextAplication';
import background from '../images/loginbackground.jpg';

function renderRcomendations(recomendation) {
  return (
    <div>
      <h3>Recomedações</h3>
      <div className="product-pic-recomendation">
        {recomendation.reduce((arr, e, i) => {
          if (i < 6) {
            return [...arr,
              <Link to={`/bebidas/${e.idDrink}`}>
                <div data-testid={`${i}-recomendation-card`}>
                  <img
                    src={e.strDrinkThumb}
                    data-testid="recipe-photo"
                    alt="thumbnail"
                  />
                  <h5 data-testid={`${i}-recomendation-title`}>{e.strDrink}</h5>
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
  const { recipeInfo, recomendation } = useContext(ContextAplication);
  const quantity = Object.keys(recipeInfo).filter((e) => e.includes('strIngredient'));
  const ingredients = (Object.keys(recipeInfo).filter((e) => e.includes('strMeasure')));
  return (
    <div className="basic-info">
      <img src={background} className="background-img" alt="background" />
      <div className="wrapper">
        <div className="square" />
        <img src={recipeInfo.strMealThumb} data-testid="recipe-photo" alt="thumb" />
      </div>
      <h1 data-testid="recipe-title">{recipeInfo.strMeal}</h1>
      <h2 data-testid="recipe-category">{recipeInfo.strCategory}</h2>
      <h3>Ingredientes</h3>
      {quantity.reduce((arr, e, i) => {
        if (recipeInfo[e] !== '') {
          return ([...arr, (
            <div data-testid={`${i}-ingredient-name-and-measure`}>
              <span>{recipeInfo[ingredients[i]]}</span>
              <span>{recipeInfo[e]}</span>
            </div>)]
          );
        } return arr;
      }, [])}
      <div className="instructions-background">
        <h3>Instruções</h3>
        <p data-testid="instructions">{recipeInfo.strInstructions}</p>
      </div>
      <ReactPlayer width="100%" data-testid="video" height="200px" url={recipeInfo.strYoutube} />
      {renderRcomendations(recomendation)}
    </div>
  );
}

export default BasicInfo;
