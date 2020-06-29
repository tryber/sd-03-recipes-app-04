import React, { useContext } from 'react';
import ReactPlayer from 'react-player';
import { InfoContext } from './DetailsFoodScreen';

function BasicInfo() {
  const {
    recipeInfo, quantity, ingredients, recomendation,
  } = useContext(InfoContext);
  return (
    <div>
      <img src={recipeInfo.strMealThumb} data-testid="recipe-photo" alt="thumb" width="100%" />
      <h1 data-testid="recipe-title">{recipeInfo.strMeal}</h1>
      <h2 data-testid="recipe-category">{recipeInfo.strCategory}</h2>
      <h3>Ingredientes</h3>
      {quantity.map((e, i) => (
        <div data-testid={`${i}-ingredient-name-and-measure`}>
          <span>{recipeInfo[ingredients[i]]}</span>
          <span>{recipeInfo[e]}</span>
        </div>
      ))}
      <h3>Instruções</h3>
      <p data-testid="instructions">{recipeInfo.strInstructions}</p>
      <ReactPlayer width="350px" data-testid="video" height="200px" url={recipeInfo.strYoutube} />
      <h3>Recomedações</h3>
      <div className="product-pic-recomendation">
        {recomendation.reduce((arr, e, i) => {
          if (i < 6) {
            return [...arr,
              <div data-testid={`${i}-recomendation-card`}>
                <img
                  src={e.strDrinkThumb}
                  data-testid="recipe-photo"
                  alt="thumbnail"
                  width="200px"
                />
                <h5 data-testid={`${i}-recomendation-title`}>{e.strDrink}</h5>
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
