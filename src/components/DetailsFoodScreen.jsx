import React, { useState, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';
import { getMealById } from '../services/foodApi';
import { getFirstDrinks } from '../services/drink-api';
import BasicInfo from './BasicInfo';
import Buttons from './Buttons';

export const InfoContext = createContext();

export default function DetailsFoodScreen(props) {
  const { id } = props.props.match.params;
  const [recipeInfo, setRecipeInfo] = useState([]);
  const [recomendation, setRecomendation] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getMealById(id).then((data) => {
      setRecipeInfo(data.meals[0]);
      setIsLoading(false);
    });
    getFirstDrinks().then((data) => setRecomendation(data.drinks));
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
          <InfoContext.Provider value={context}>
            <BasicInfo />
            <Buttons />
          </InfoContext.Provider>
        </div>
      )}
    </div>
  );
}

DetailsFoodScreen.propTypes = {
  props: PropTypes.string.isRequired,
};
