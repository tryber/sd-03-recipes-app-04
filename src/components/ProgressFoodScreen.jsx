import React from 'react';

function ProgressFoodScreen() {
  return (
    <div>
      InProgressRecipe Placeholder
      <img src="" alt="" data-testid="recipe-photo" />
      <button type="button" data-testid="share-btn"> share Button </button>
      <button type="button" data-testid="favorite-btn"> Favorite Button</button>
      <h1 data-testid="recipe-title">Recipe Title Placeholder </h1>
      <h3 data-testid="recipe-category">Recipe Category Placeholder</h3>
      <ul>
        <li>
          Recipe List Placeholder
        </li>
      </ul>
      <div data-testid="instructions">
        Placeholder Instructions
      </div>
      <button data-testid="finish-recipe-btn" type="button">
        Finish Recipe Button
      </button>
    </div>
  );
}

export default ProgressFoodScreen;
