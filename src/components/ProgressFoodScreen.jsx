import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import share from '../images/shareIcon.svg';
import notFavorite from '../images/whiteHeartIcon.svg';
import favorite from '../images/blackHeartIcon.svg';
import { getMealById } from '../services/foodApi';

function ProgressFoodScreen(props) {
  const [inProgressRecipe, setInProgressRecipe] = useState([]);
  const [showCopyAlert, setShowCopyAlert] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { match } = props;
  const { params } = match;
  const { id } = params;
  const checkLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const [countChecked, setCountChecked] = useState(0);
  const ingredientsDoneList = [];
  const quantity = Object.keys(inProgressRecipe).filter((e) => e.includes('strIngredient'));
  const ingredients = Object.keys(inProgressRecipe).filter((e) => e.includes('strMeasure'));
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

  useEffect(() => {
    getMealById(id).then((data) => {
      setInProgressRecipe(data.meals[0]);
    });
  }, []);

  useEffect(() => {
    if (getIfHasBeenFavorited(id)) { setIsFavorite(true); }
  }, [id]);

  useEffect(() => {
    if (checkLocalStorage === null) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({ meals: { [id]: checked.checkbox }, countChecked }));
    }
  }, [checkLocalStorage]);

  useEffect(() => {
  }, [checked, countChecked]);

  function changeChecked(event, value) {
    console.log(event.target.checked);
    checked.checkbox.forEach((checkbox) => {
      if (event.target.checked === true) {
        setCountChecked(countChecked + 1);
      } if (event.target.checked === false) {
        console.log(countChecked);
        if (checkLocalStorage.countChecked < 0) {
          setCountChecked(countChecked + 1);
        } else {
          setCountChecked(countChecked - 1);
        }
      }
      if (checkbox.id === Number(event.target.id)) {
        checkbox.name = event.target.name;
        checkbox.checked = event.target.checked;
      }
    });
    setChecked((prevState) => ({
      ...prevState,
      checked: {
        ...prevState.checkbox.checked,
        checkbox: value,
      },
    }));
    localStorage.setItem('inProgressRecipes', JSON.stringify({ meals: { [id]: checked.checkbox }, countChecked }));
  }

  function clickFavorite(recipeInfo, isFavoritePar) {
    setIsFavorite(!isFavoritePar);
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
    if (!isFavoritePar) {
      const newStorage = [...storage, mealInfo];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
    }
    if (isFavoritePar) {
      const newStorage = storage.filter((e) => !e.id === idMeal);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
    }
  }

  function getIfHasBeenFavorited(id) {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (storage) {
      const favorited = storage.find((e) => e.id === id);
      return favorited;
    }
    return false;
  }

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

  function copyContent(text, event) {
    const separetedText = text.split('/');
    const modifiedText = `${separetedText[0]}//${separetedText[2]}/${separetedText[4]}/${separetedText[5]}`;
    navigator.clipboard.writeText(modifiedText)
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
  
  const data = mountRecipeList(quantity, ingredients);
  const buttonEnabled = countChecked === data.length;
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
        onClick={() => clickFavorite(inProgressRecipe, isFavorite)}
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
            <input id={i} type="checkbox" checked={checkLocalStorage.meals[id][i].checked} name={element.meal} onClick={(event) => changeChecked(event, checked.checkbox[i].checked)} />
            <span>{element.meal}</span>
            {element.mensure}
          </span>
        </div>
      ))}
      <div data-testid="instructions">
        {inProgressRecipe.strInstructions}
      </div>
      {buttonEnabled
        ? (
          <button enable data-testid="finish-recipe-btn" type="button">
            Finish Recipe Button
          </button>
        )
        : (
          <button disabled data-testid="finish-recipe-btn" type="button">
            Finish Recipe Button
          </button>
        )}
    </div>
  );
}

ProgressFoodScreen.propTypes = {
  // id: PropTypes.string.isRequired,
  match: PropTypes.string.isRequired,

};

export default ProgressFoodScreen;
