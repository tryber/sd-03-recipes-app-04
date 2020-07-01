export async function getFirstDrinks() {
  return fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
    .then((resp) => resp.json());
}

export async function getListDrinksCategories() {
  return fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
    .then((resp) => resp.json());
}

export async function getDrinkByCategories(categorie) {
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categorie}`)
    .then((resp) => resp.json());
}

export async function getRandomDrink() {
  return fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then((resp) => resp.json());
}

export async function getDrinksByIngredient(search) {
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`)
    .then((resp) => resp.json())
    .catch((err) => console.log(err));
}

export async function getDrinksByName(search) {
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)
    .then((resp) => resp.json());
}

export async function getDrinksByLetter(search) {
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`)
    .then((resp) => resp.json());
}

export async function getDrinkByID(id) {
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((resp) => resp.json());
}

export async function getIngredientsList() {
  return fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
    .then((resp) => resp.json());
}
