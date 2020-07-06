import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import share from '../images/shareIcon.svg';
import notFavorite from '../images/whiteHeartIcon.svg';
import favorite from '../images/blackHeartIcon.svg';
import { getDrinkByID } from '../services/drink-api';
import { changeChecked, clickFavorite } from './functionsProgressScreen';
import checkedlist from './checklist';

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
  const [checked, setChecked] = useState(checkedlist);

  useEffect(() => {
    getDrinkByID(id).then((data) => {
      console.log(data.drinks[0]);
      setInProgressDrink(data.drinks[0]);
    });
  }, []);

  function getIfHasBeenFavorited(idPar) {
    console.log(idPar);
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (storage) {
      const favorited = storage.find((e) => e.id === idPar);
      return favorited;
    }
    return false;
  }

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

  function mountRecipeList(quantityPar, ingredientsPar) {
    quantityPar.map((e, i) => (inProgressDrink[e] !== null && inProgressDrink[e] !== ''
      ? ingredientsDoneList.push({
        meal: inProgressDrink[e],
        mensure: inProgressDrink[ingredientsPar[i]],
        checked: checked.checkbox[i],
      })
      : null
    ));

    return ingredientsDoneList;
  }

  function copyContent(text) {
    const separetedText = text.split('/');
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
        onClick={() => clickFavorite(inProgressDrink, isFavorite, setIsFavorite, 'bebida')}
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
            <input id={i} type="checkbox" checked={checkLocalStorage.cocktails[id][i].checked} name={element.cocktails} onClick={(event) => changeChecked(event, checked.checkbox[i].checked, setCountChecked, setChecked, checked, countChecked, checkLocalStorage, id, 'cocktails')} />
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
          <button enable data-testid="finish-recipe-btn" onClick={(() => props.history.push('/receitas-feitas'))} type="button">
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
  match: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  history: PropTypes.string.isRequired,
  push: PropTypes.string.isRequired,
};

export default ProgressDrinkScreen;
