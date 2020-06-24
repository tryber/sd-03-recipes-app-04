import React, { useEffect, useState } from 'react';
import * as foodApi from '../services/foodApi';

export default function Home() {
  const [meal, setMeal] = useState([]);
  useEffect(() => {
    foodApi.getFirstMeals().then((data) => setMeal(data.meals));
  }, []);

  return (
    <div>
      <p>{meal.map((e) => <img src={e.strMealThumb} width="200px" alt="thumbnail" />)}</p>
    </div>
  );
}
