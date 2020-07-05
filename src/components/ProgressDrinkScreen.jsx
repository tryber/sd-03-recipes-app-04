import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import share from '../images/shareIcon.svg';
import notFavorite from '../images/whiteHeartIcon.svg';
import favorite from '../images/blackHeartIcon.svg';
import { getDrinkByID } from '../services/drink-api';

function ProgressDrinkScreen(props) {
  const [inProgressDrink, setInProgressDrink] = useState([]);
  const [showCopyAlert, setShowCopyAlert] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [countChecked, setCountChecked] = useState(0);
  const ingredientsDoneList = [];
  const checkLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const quantity = Object.keys(inProgressDrink).filter((e) => e.includes('strIngredient'));
  const ingredients = Object.keys(inProgressDrink).filter((e) => e.includes('strMeasure'));
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
  const [checked, setChecked] = useState(checkedlist);

  useEffect(() => {
    getDrinkByID(id).then((data) => {
      console.log(data.drinks[0]);
      setInProgressDrink(data.drinks[0]);
    });
  }, []);

  useEffect(() => {
    if (getIfHasBeenFavorited(id)) { setIsFavorite(true); }
  }, [id]);

  useEffect(() => {
    if (checkLocalStorage === null) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({ cocktails: { [id]: checked.checkbox }, countChecked }));
    }
  }, [checkLocalStorage]);

  useEffect(() => {
  }, [checked, countChecked]);

  function getIfHasBeenFavorited(id) {
    console.log(id);
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (storage) {
      const favorited = storage.find((e) => e.id === id);
      return favorited;
    }
    return false;
  }

  function clickFavorite(recipeInfo, isFavoritePar) {
    setIsFavorite(!isFavoritePar);
    const {
      idDrink, strDrink, strAlcoholic, strDrinkThumb, strCategory,
    } = recipeInfo;
    const mealInfo = {
      id: idDrink,
      type: 'bebida',
      area: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
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
      const newStorage = storage.filter((e) => !e.id === idDrink);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
    }
  }

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
    localStorage.setItem('inProgressRecipes', JSON.stringify({ cocktails: { [id]: checked.checkbox }, countChecked }));
  }
  function copyContent(text) {
    const separetedText = text.split('/');
    console.log(separetedText);
    const modifiedText = `${separetedText[0]}//${separetedText[2]}/${separetedText[4]}/${separetedText[5]}`;
    navigator.clipboard.writeText(modifiedText)
      .then(() => {
        setShowCopyAlert(true);
        alert('Link copiado!');
        alert(modifiedText);
        alert('Link copiado!');
      })
      .catch((err) => {
        console.log('Something went wrong', err);
      });
    alert('Link copiado!');
  }

  useEffect(() => {
    if (getIfHasBeenFavorited(id)) { setIsFavorite(true); }
  }, [id]);

  const data = mountRecipeList(quantity, ingredients);
  const buttonEnabled = countChecked === data.length;

  // const checkLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  return (
    <div>
      <img src={inProgressDrink.strDrinkThumb} alt="" data-testid="recipe-photo" />
      {showCopyAlert ? <h2>Link copiado!</h2> : null}
      <button
        data-testid="share-btn"
        type="button"
        onClick={() => copyContent(`http://localhost:3000/${props.location.pathname}`)}
        className="favourite"
      >
        <img src={share} alt="icon" />
      </button>
      <button
        type="button"
        className="favourite"
        onClick={() => clickFavorite(inProgressDrink, isFavorite)}
        src={favorite}
      >
        {getIfHasBeenFavorited(id)
          ? <img data-testid="favorite-btn" src={favorite} alt="favorite" />
          : <img data-testid="favorite-btn" src={notFavorite} alt="favorite" />}
      </button>
      <h1 data-testid="recipe-title">
        {inProgressDrink.strMeal}
      </h1>
      <h3 data-testid="recipe-category">{inProgressDrink.strCategory}</h3>
      {data.map((element, i) => (
        <div key={element.meal} data-testid={`${i}-ingredient-step`}>
          <span>
            <input id={i} type="checkbox" checked={checkLocalStorage.cocktails[id][i].checked} name={element.meal} onClick={(event) => changeChecked(event, checked.checkbox[i].checked)} />
            <span>{element.meal}</span>
            {element.mensure}
          </span>
        </div>
      ))}

      <div data-testid="instructions">
        {inProgressDrink.strInstructions}
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

ProgressDrinkScreen.propTypes = {
  // id: PropTypes.string.isRequired,
  match: PropTypes.string.isRequired,

};

export default ProgressDrinkScreen;
