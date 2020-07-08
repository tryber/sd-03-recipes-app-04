import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import FoodBasicInfo from './FoodBasicInfo';
import FoodButtons from './FoodButtons';
import { ContextAplication } from '../context/ContextAplication';
import './CSS/DetailsFoodScreen.css';

export default function DetailsFoodScreen(props) {
  const { id } = props.props.match.params;
  const { getFoodScreenInfos } = useContext(ContextAplication);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getFoodScreenInfos(id);
    setIsLoading(false);
  }, [id]);

  return (
    <div>
      {isLoading && <h1>Carregando...</h1>}
      {!isLoading && (
        <div className="details-screen">
            {!isLoading && <FoodBasicInfo />}
            {!isLoading && <FoodButtons />}
        </div>
      )}
    </div>
  );
}

DetailsFoodScreen.propTypes = {
  props: PropTypes.string.isRequired,
};
