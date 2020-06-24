export async function getFirstDrinks() {
  return fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
    .then((resp) => resp.json());
}

export async function getListDrinksCategories() {
  return fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
    .then((resp) => resp.json());
}

export async function getRandomDrink() {
  return fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then((resp) => resp.json());
}

export async function getDrinks(option, search) {
  if (option === 'ingredient') {
    return fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${search}`)
      .then((resp) => resp.json());
  }
  if (option === 'name') {
    return fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)
      .then((resp) => resp.json());
  }
  if (option === 'letter') {
    return fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`)
      .then((resp) => resp.json());
  }
}

export async function getDrinkByID(id) {
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((resp) => resp.json());
}

export async function getIngredientImage(ingredient) {
  return fetch(`https://www.thecocktaildb.com/images/ingredients/${ingredient}.png`)
    .then((resp) => resp.json());
}
