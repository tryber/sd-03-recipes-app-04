import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getIngredientsList } from '../services/drink-api';
import { ContextAplication } from '../context/ContextAplication';
import InferiorMenu from './InferiorMenu';
import Header from './Header';

function ExploreDrinkIngredientScreen() {
  const [ingredients, setingredients] = useState([]);
  const { setingredientFilter } = useContext(ContextAplication);

  useEffect(() => {
    getIngredientsList()
      .then((answer) => setingredients(answer.drinks));
  }, []);

  return (
    <div>
      <Header screen={'Explorar Ingredientes'} />
      <div className="food-screen">
        <div className="ingridients-list">
          {ingredients.reduce((arr, e, i) => {
            if (i < 12) {
              return [...arr,
                <Link to="/bebidas">
                  <button
                    type="button"
                    className={`product-pic-${i} product-pic slide-in-fwd-center`}
                    data-testid={`${i}-ingredient-card`}
                    onClick={() => setingredientFilter(e.strIngredient1)}
                  >
                    <img
                      src={`https://www.thecocktaildb.com/images/ingredients/${e.strIngredient1}-Small.png`}
                      alt="thumbnail"
                      width="120px"
                      data-testid={`${i}-card-img`}
                    />
                    <h5 data-testid={`${i}-card-name`}>{e.strIngredient1}</h5>
                  </button>
                </Link>,
              ];
            }
            return arr;
          }, [])}
        </div>
      </div>
      <InferiorMenu />
    </div>

  );
}

export default ExploreDrinkIngredientScreen;

