import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getDrinkByID } from '../services/drink-api';

function ProgressDrinkScreen(props) {
  const [inProgressDrink, setInProgressDrink] = useState([]);
  const { match } = props;
  const { params } = match;
  const { id } = params;
  const checkedlist = {
    checkbox: [
      { id: 0, name: '', checked: false },
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
  const ingredientsDoneList = [];
  const [checked, setChecked] = useState(checkedlist);

  useEffect(() => {
    getDrinkByID(id).then((data) => {
      console.log(data.drinks[0]);
      setInProgressDrink(data.drinks[0]);
    });
  }, []);

  function mountRecipeList(quantity, ingredients) {
    quantity.map((e, i) => (inProgressDrink[e] !== null && inProgressDrink[e] !== ''
      ? ingredientsDoneList.push({
        meal: inProgressDrink[e],
        mensure: inProgressDrink[ingredients[i]],
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
      if (checkbox.id === Number(event.target.id)) {
        checkbox.name = event.target.name;
        checkbox.checked = event.target.checked;
      }
    });
    setChecked(checked);
    localStorage.setItem('inProgressRecipes', JSON.stringify({ cocktails: { [id]: checked.checkbox } }));
  }

  const quantity = Object.keys(inProgressDrink).filter((e) => e.includes('strIngredient'));
  const ingredients = Object.keys(inProgressDrink).filter((e) => e.includes('strMeasure'));
  const data = mountRecipeList(quantity, ingredients);
  const checkLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  return (
    <div>
      <img src={inProgressDrink.strDrinkThumb} alt="" data-testid="recipe-photo" />
      <button type="button" data-testid="share-btn"> share Button </button>
      <button type="button" data-testid="favorite-btn"> Favorite Button</button>
      <h1 data-testid="recipe-title">
        {inProgressDrink.strMeal}
      </h1>
      <h3 data-testid="recipe-category">{inProgressDrink.strCategory}</h3>
      {data.map((element, i) => (
        <div key={element.meal} data-testid={`${i}-ingredient-step`}>
          <span>
            <input id={i} type="checkbox" checked name={element.meal} onClick={(event) => changeChecked(event)} />
            <span>{element.meal}</span>
            {element.mensure}
          </span>
        </div>
      ))}

      <div data-testid="instructions">
        {inProgressDrink.strInstructions}
      </div>
      <button data-testid="finish-recipe-btn" type="button">
        Finish Recipe Button
      </button>
    </div>
  );
}

ProgressDrinkScreen.propTypes = {
  // id: PropTypes.string.isRequired,
  match: PropTypes.string.isRequired,

};

export default ProgressDrinkScreen;
