export const getMealByName = async (food) => {
  const meal = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${food}`);
  const mealInfo = await meal.json();
  return mealInfo;
};

export const getMealByCategorie = async (category) => {
  const meal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const mealInfo = await meal.json();
  return mealInfo;
};

export const getMealByArea = async (area) => {
  const meal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
  const mealInfo = await meal.json();
  return mealInfo;
};

export const getByIgredient = async (ingredient) => {
  const meal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const mealInfo = await meal.json();
  return mealInfo;
};

export const getByFirstLetter = async (firstLetter) => {
  const meal = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const mealInfo = await meal.json();
  return mealInfo;
};

export const getFirstMeals = async () => {
  const meal = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const mealInfo = await meal.json();
  return mealInfo;
};

export const getMealById = async (id) => {
  const meal = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const mealInfo = await meal.json();
  return mealInfo;
};

export const getRandomMeal = async () => {
  const meal = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const mealInfo = await meal.json();
  return mealInfo;
};

export const getCategoriesList = async () => {
  const meal = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const mealInfo = await meal.json();
  return mealInfo;
};

export const getIngredientsList = async () => {
  const meal = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
  const mealInfo = await meal.json();
  return mealInfo;
};

export const getAreaList = async () => {
  const meal = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  const mealInfo = await meal.json();
  return mealInfo;
};
