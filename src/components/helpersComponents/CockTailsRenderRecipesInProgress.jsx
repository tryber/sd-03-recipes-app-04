import React from 'react';
import PropTypes from 'prop-types';
import { copyContent } from './MealsfunctionsProgressScreen';
import CockTailsListRecipeProgress from './CockTailsListRecipeProgress';
import share from '../../images/shareIcon.svg';

function CocktailsRenderRecipesInProgress(props) {
  const { values } = props;
  const {
    setShowCopyAlert,
    inProgressDrink,
    showCopyAlert,
    pathname,
  } = values;
  return (
    <div>
      <img src={inProgressDrink.strDrinkThumb} alt="" data-testid="recipe-photo" />
      {showCopyAlert ? <h2>Link copiado!</h2> : null}
      <button
        type="button"
        data-testid="share-btn"
        onClick={() => copyContent(`http://localhost:3000/${pathname}`, setShowCopyAlert)}
        className="favourite"
      >
        <img src={share} alt="icon" />
      </button>
      <CockTailsListRecipeProgress listValues={values} />
    </div>
  );
}

CocktailsRenderRecipesInProgress.propTypes = {
  values: PropTypes.string.isRequired,
};
export default CocktailsRenderRecipesInProgress;
