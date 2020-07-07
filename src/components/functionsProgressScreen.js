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

export function copyContent(text, setShowCopyAlert) {
  const separetedText = text.split('/');
  const modifiedText = `${separetedText[0]}//${separetedText[2]}/${separetedText[4]}/${separetedText[5]}`;
  navigator.clipboard.writeText(modifiedText)
    .then(() => {
      setShowCopyAlert(true);
      alert(modifiedText);
    })
    .catch((err) => {
      alert(err);
    });
}

export function mountRecipeList(inProgressRecipe, checked, ingredientsDoneList) {
  const quant = Object.keys(inProgressRecipe).filter((e) => e.includes('strIngredient'));
  const ingred = Object.keys(inProgressRecipe).filter((e) => e.includes('strMeasure'));
  quant.map((e, i) => (inProgressRecipe[e] !== null && inProgressRecipe[e] !== ''
    ? ingredientsDoneList.push({
      meal: inProgressRecipe[e],
      mensure: inProgressRecipe[ingred[i]],
      checked: checked.checkbox[i],
    })
    : null
  ));

  return ingredientsDoneList;
}

export function getIfHasBeenFavorited(idPar) {
  const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (storage) {
    const favorited = storage.find((e) => e.id === idPar);
    return favorited;
  }
  return false;
}
