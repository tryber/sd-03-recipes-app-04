export const getMealByName = async (food) => {
  const meal = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${food}`);
  const mealInfo = await meal.json();
  return mealInfo;
};

export const getMealByCategorie = async (category) => {
  const meal = await fetch(`https://www.themealdb.com/api/json/v1/1/${category}.php`);
  const mealInfo = await meal.json();
  return mealInfo;
};

export const getByIgredient = async (igredient) => {
  const meal = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=${igredient}`);
  const mealInfo = await meal.json();
  return mealInfo;
};

export const getByFirstLetter = async (firstLetter) => {
  const meal = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const mealInfo = await meal.json();
  return mealInfo;
}

export const getFirstMeals = async () => {
  const meal = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
  const mealInfo = await meal.json();
  return mealInfo;
};

export const getMealById = async (id) => {
  const meal = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const mealInfo = await meal.json();
  return mealInfo;
};

export const getRandomMeal = async () => {
  const meal = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
  const mealInfo = await meal.json();
  return mealInfo;
};

export const getIgredientPic = async (igredient) => {
  const meal = await fetch(`https://www.themealdb.com/images/ingredients/${igredient}.png`);
  const mealInfo = await meal.json();
  return mealInfo;
};
