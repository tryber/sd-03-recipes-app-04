import React from 'react';
import PropTypes from 'prop-types';
import { copyContent } from '../functionsProgressScreen';
import MealsListRecipeProgress from './MealListRecipeProgress';
import share from '../../images/shareIcon.svg';

function MealsRenderRecipesInProgress(props) {
  const { values } = props;
  const {
    setShowCopyAlert,
    inProgressRecipe,
    showCopyAlert,
    pathname,
  } = values;
  return (
    <div>
      <img src={inProgressRecipe.strMealThumb} alt="" data-testid="recipe-photo" />
      {showCopyAlert ? <h2>Link copiado!</h2> : null}
      <button
        type="button"
        data-testid="share-btn"
        onClick={() => copyContent(`http://localhost:3000/${pathname}`, setShowCopyAlert)}
        className="favourite"
      >
        <img src={share} alt="icon" />
      </button>
      <MealsListRecipeProgress listValues={values} />
    </div>
  );
}

MealsRenderRecipesInProgress.propTypes = {
  values: PropTypes.string.isRequired,
};
export default MealsRenderRecipesInProgress;
