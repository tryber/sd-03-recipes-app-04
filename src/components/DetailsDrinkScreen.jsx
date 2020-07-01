import React, { useState, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';
import { getDrinkByID } from '../services/drink-api';
import { getFirstMeals } from '../services/foodApi';
import DrinkBasicInfo from './DrinkBasicInfo';
import DrinkButtons from './DrinkButtons';

export const DrinkContext = createContext();

export default function DetailsDrinkScreen(props) {
  const { id } = props.props.match.params;
  const [recipeInfo, setRecipeInfo] = useState([]);
  const [recomendation, setRecomendation] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getDrinkByID(id).then((data) => {
      setRecipeInfo(data.drinks[0]);
      setIsLoading(false);
    });
    getFirstMeals().then((data) => setRecomendation(data.meals));
  }, [id]);
  const quantity = Object.keys(recipeInfo).filter((e) => e.includes('strIngredient'));
  const ingredients = Object.keys(recipeInfo).filter((e) => e.includes('strMeasure'));
  const context = {
    recipeInfo, quantity, ingredients, recomendation, id,
  };
  return (
    <div>
      {isLoading && <h1>Carregando...</h1>}
      {!isLoading && (
        <div>
          <DrinkContext.Provider value={context}>
            <DrinkBasicInfo />
            <DrinkButtons />
          </DrinkContext.Provider>
        </div>
      )}
    </div>
  );
}

DetailsDrinkScreen.propTypes = {
  props: PropTypes.string.isRequired,
};
