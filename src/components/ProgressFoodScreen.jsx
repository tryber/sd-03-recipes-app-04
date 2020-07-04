import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { getIfHasBeenFavorited } from './FoodButtons';
import share from '../images/shareIcon.svg';
import notFavorite from '../images/whiteHeartIcon.svg';
import favorite from '../images/blackHeartIcon.svg';
import { getMealById } from '../services/foodApi';
import { ContextAplication } from '../context/ContextAplication';

function ProgressFoodScreen(props) {
  const [inProgressRecipe, setInProgressRecipe] = useState([]);
  const [showCopyAlert, setShowCopyAlert] = useState(false);
  const { recipeInfo } = useContext(ContextAplication);
  const [isFavorite, setIsFavorite] = useState(false);
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

  function clickFavorite(setIsFavorite, recipeInfo, isFavorite) {
    setIsFavorite((fav) => !fav);
    const {
      idMeal, strArea, strCategory, strMeal, strMealThumb,
    } = recipeInfo;
    const mealInfo = {
      id: idMeal,
      type: 'comida',
      area: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
    };
    let storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!storage) {
      storage = [];
    }
    if (!isFavorite) {
      const newStorage = [...storage, mealInfo];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
    }
    if (isFavorite) {
      const newStorage = storage.filter((e) => !e.id === idMeal);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
    }
  }

  function changeChecked(event) {
    checked.checkbox.forEach((checkbox) => {
      if (checkbox.id === Number(event.target.id)) {
        checkbox.name = event.target.name;
        checkbox.checked = event.target.checked;
      }
    });
    setChecked(checked);
    localStorage.setItem('inProgressRecipes', JSON.stringify({ meals: { [id]: checked.checkbox } }));
  }
  async function copyContent(text, event) {
    const separetedText = text.split('/');
    console.log(separetedText);
    const modifiedText = `${separetedText[0]}//${separetedText[2]}/${separetedText[4]}/${separetedText[5]}`;
    await navigator.clipboard.writeText(modifiedText)
      .then(() => {
        setShowCopyAlert(true);
        alert(modifiedText);
        alert('Link copiado!');
        alert('Link copiado!');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getMealById(id).then((data) => {
      setInProgressRecipe(data.meals[0]);
    });
  }, [showCopyAlert]);
  const quantity = Object.keys(inProgressRecipe).filter((e) => e.includes('strIngredient'));
  const ingredients = Object.keys(inProgressRecipe).filter((e) => e.includes('strMeasure'));
  const data = mountRecipeList(quantity, ingredients);
  const checkLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));

  return (
    <div>
      <img src={inProgressRecipe.strMealThumb} alt="" data-testid="recipe-photo" />
      {showCopyAlert ? <h2>Link copiado!</h2> : null}
      <button
        type="button"
        data-testid="share-btn"
        onClick={(event) => copyContent(`http://localhost:3000/${props.location.pathname}`, event)}
        className="favourite"
      >
        <img src={share} alt="icon" />
      </button>

      <button
        type="button"
        className="favourite"
        onClick={() => clickFavorite(setIsFavorite, recipeInfo, isFavorite)}
        src={favorite}
      >
        {getIfHasBeenFavorited(id)
          ? <img data-testid="favorite-btn" src={favorite} alt="favorite" />
          : <img data-testid="favorite-btn" src={notFavorite} alt="favorite" />}
      </button>

      <h1 data-testid="recipe-title"> Ingredients </h1>
      <h3 data-testid="recipe-category">{inProgressRecipe.strCategory}</h3>
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
