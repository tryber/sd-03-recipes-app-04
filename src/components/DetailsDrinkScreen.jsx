import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import DrinkBasicInfo from './DrinkBasicInfo';
import DrinkButtons from './DrinkButtons';
import { ContextAplication } from '../context/ContextAplication';

export default function DetailsDrinkScreen(props) {
  const { id } = props.props.match.params;
  const { getDrinkScreenInfos } = useContext(ContextAplication);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getDrinkScreenInfos(id);
    setIsLoading(false);
  }, [id]);

  return (
    <div>
      {isLoading && <h1>Carregando...</h1>}
      {!isLoading && (
        <div className="details-screen">
            {!isLoading && <DrinkBasicInfo />}
            {!isLoading && <DrinkButtons />}
        </div>
      )}
    </div>
  );
}

DetailsDrinkScreen.propTypes = {
  props: PropTypes.string.isRequired,
};
