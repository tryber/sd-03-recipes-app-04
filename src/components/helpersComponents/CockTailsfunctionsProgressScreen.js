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

export function copyContent(text, setShowCopyAlert) {
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

export function getIfHasBeenFavorited(idPar) {
  const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (storage) {
    const favorited = storage.find((e) => e.id === idPar);
    return favorited;
  }
  return false;
}
