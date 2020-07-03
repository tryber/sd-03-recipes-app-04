import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getMealById } from '../services/foodApi';

function ProgressFoodScreen(props) {
  const [inProgressRecipe, setInProgressRecipe] = useState([]);
  /*   const [ingredientsDone, setIngredientsDone] = useState([]);
 */ const checkedlist = {
    checkbox: [
      { id: 0, checked: false },
      { id: 1, checked: false },
      { id: 2, checked: false },
      { id: 3, checked: false },
      { id: 4, checked: false },
      { id: 5, checked: false },
      { id: 6, checked: false },
      { id: 7, checked: false },
      { id: 8, checked: false },
      { id: 9, checked: false },
      { id: 10, checked: false },
      { id: 11, checked: false },
      { id: 12, checked: false },
      { id: 13, checked: false },
      { id: 14, checked: false },
      { id: 15, checked: false },
      { id: 16, checked: false },
      { id: 17, checked: false },
      { id: 18, checked: false },
      { id: 19, checked: false },
      { id: 20, checked: false },
    ],
  };

  const [checked, setChecked] = useState(checkedlist);
  const { match } = props;
  const { params } = match;
  const { id } = params;
  const ingredientsDoneList = [];

  function mountRecipeList(quantity, ingredients) {
    quantity.map((e, i) => (inProgressRecipe[e] !== null && inProgressRecipe[e] !== ''
      ? ingredientsDoneList.push({
        meal: inProgressRecipe[e],
        mensure: inProgressRecipe[ingredients[i]],
        checked: checked.checkbox[i],
      })
      : null
    ));

    return ingredientsDoneList;
  }

  /*   function changeChecked(element, event) {
    console.log(event.target.checked);
    setChecked(element);
  } */

  function changeChecked(event) {
    checked.checkbox.forEach((checkbox) => {
      console.log(checkbox.id, Number(event.target.id));
      if (checkbox.id === Number(event.target.id)) checkbox.checked = event.target.checked;
    });
    setChecked(checked);
    console.log(checked);
  }

  useEffect(() => {
    getMealById(id).then((data) => {
      setInProgressRecipe(data.meals[0]);
    });
  }, []);
  const quantity = Object.keys(inProgressRecipe).filter((e) => e.includes('strIngredient'));
  const ingredients = Object.keys(inProgressRecipe).filter((e) => e.includes('strMeasure'));
  const data = mountRecipeList(quantity, ingredients);
  return (
    <div>
      <img src={inProgressRecipe.strMealThumb} alt="" data-testid="recipe-photo" />
      <button type="button" data-testid="share-btn"> share Button </button>
      <button type="button" data-testid="favorite-btn"> Favorite Button</button>
      <h1 data-testid="recipe-title"> Ingredients </h1>
      <h3 data-testid="recipe-category">{inProgressRecipe.strCategory}</h3>
      {data.map((element, i) => (
        <div key={element.meal} data-testid={`${i}-ingredient-step`}>
          <span>
            <input id={i} type="checkbox" onClick={(event) => changeChecked(event)} />
            <span>{element.meal}</span>
            {element.mensure}
          </span>
        </div>
      ))}
      <div data-testid="instructions">
        {inProgressRecipe.strInstructions}
      </div>
      <button data-testid="finish-recipe-btn" type="button">
        Finish Recipe Button
      </button>
    </div>
  );
}

ProgressFoodScreen.propTypes = {
  // id: PropTypes.string.isRequired,
  match: PropTypes.string.isRequired,

};

export default ProgressFoodScreen;
