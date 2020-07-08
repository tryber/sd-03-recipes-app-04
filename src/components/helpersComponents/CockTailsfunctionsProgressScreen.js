export function clickFavorite(recipeInfo, isFavoritePar, setIsFavorite) {
  setIsFavorite(!isFavoritePar);
  const {
    idDrink, strDrinkThumb, strCategory, strAlcoholic, strDrink,
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
