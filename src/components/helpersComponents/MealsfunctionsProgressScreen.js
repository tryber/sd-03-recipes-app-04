export function clickFavorite(recipeInfo, isFavoritePar, setIsFavorite, type) {
  setIsFavorite(!isFavoritePar);
  let mealInfo;
  if (type === 'comida') {
    const {
      idMeal, strArea, strCategory, strMeal, strMealThumb,
    } = recipeInfo;
    mealInfo = {
      id: idMeal,
      type: 'comida',
      area: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
    };
  } else if (type === 'bebida') {
    const {
      idDrink, strDrink, strAlcoholic, strDrinkThumb, strCategory,
    } = recipeInfo;
    mealInfo = {
      id: idDrink,
      type: 'bebida',
      area: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
    };
  }

  let storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (!storage) {
    storage = [];
  }
  if (!isFavoritePar) {
    const newStorage = [...storage, mealInfo];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
  }
  if (isFavoritePar) {
    const newStorage = storage.filter((e) => !e.id === mealInfo.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
  }
}

export function mountRecipeList(quantityPar, ingredientsPar,
  inProgressRecipe, checked, ingredientsDoneList) {
  quantityPar.map((e, i) => (inProgressRecipe[e] !== null && inProgressRecipe[e] !== ''
    ? ingredientsDoneList.push({
      meal: inProgressRecipe[e],
      mensure: inProgressRecipe[ingredientsPar[i]],
      checked: checked.checkbox[i],
    })
    : null
  ));

  return ingredientsDoneList;
}
