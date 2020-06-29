import React, { useContext } from 'react';
import ReactPlayer from 'react-player';
import { InfoContext } from './DetailsFoodScreen';

function BasicInfo() {
  const {
    recipeInfo, quantity, ingredients, recomendation,
  } = useContext(InfoContext);
  return (
    <div>
      <img src={recipeInfo.strMealThumb} alt="thumb" width="100%" />
      <h1>{recipeInfo.strMeal}</h1>
      <h2>{recipeInfo.strCategory}</h2>
      <h3>Ingredientes</h3>
      {quantity.map((e, i) => (
        <div>
          <span>{recipeInfo[ingredients[i]]}</span>
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
    </div>
  );
}

export default BasicInfo;
