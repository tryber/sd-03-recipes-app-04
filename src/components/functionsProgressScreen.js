export function changeChecked(event,
  value, setCountChecked, setChecked, checked, countChecked, checkLocalStorage, id, type) {
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
  localStorage.setItem('inProgressRecipes', JSON.stringify({ [type]: { [id]: checked.checkbox }, countChecked }));
}

export function clickFavorite(recipeInfo, isFavoritePar, setIsFavorite, type) {
  setIsFavorite(!isFavoritePar);
  const {
    idMeal, strArea, strCategory, strMeal, strMealThumb,
  } = recipeInfo;
  const {
    idDrink, strDrink, strAlcoholic, strDrinkThumb,
  } = recipeInfo;
  const mealInfo = type === 'comida'
    ? {
      id: idMeal,
      type: 'comida',
      area: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
    }
    : {
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
    const newStorage = storage.filter((e) => !e.id === idMeal);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
  }
}
