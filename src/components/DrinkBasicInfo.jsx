import React, { useContext } from 'react';
import { DrinkContext } from './DetailsDrinkScreen';

function BasicInfo() {
  const {
    recipeInfo, quantity, ingredients, recomendation,
  } = useContext(DrinkContext);
  return (
    <div>
      <img src={recipeInfo.strDrinkThumb} data-testid="recipe-photo" alt="thumb" width="100%" />
      <h1 data-testid="recipe-title">{recipeInfo.strDrink}</h1>
      <h2 data-testid="recipe-category">{recipeInfo.strAlcoholic}</h2>
      <h3>Ingredientes</h3>
      {quantity.reduce((arr, e, i) => {
        if (recipeInfo[e] !== null) {
          return (
            [...arr, (
              <div data-testid={`${i}-ingredient-name-and-measure`}>
                <span>{recipeInfo[ingredients[i]]}</span>
                <span>{recipeInfo[e]}</span>
              </div>)]
          );
        } return arr;
      }, [])}
      <h3>Instruções</h3>
      <p data-testid="instructions">{recipeInfo.strInstructions}</p>
      <h3>Recomedações</h3>
      <div className="product-pic-recomendation">
        {recomendation.reduce((arr, e, i) => {
          if (i < 6) {
            return [...arr,
              <div data-testid={`${i}-recomendation-card`}>
                <img
                  src={e.strMealThumb}
                  data-testid="recipe-photo"
                  alt="thumbnail"
                  width="200px"
                />
                <h5 data-testid={`${i}-recomendation-title`}>{e.strMeal}</h5>
              </div>,
            ];
          }
          return arr;
        }, [])}
      </div>
    </div>
  );
}

export default BasicInfo;
