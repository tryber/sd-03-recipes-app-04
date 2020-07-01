import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import BasicInfo from './FoodBasicInfo';
import Buttons from './FoodButtons';
import { ContextAplication } from '../context/ContextAplication';


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
        <div>
            {!isLoading && <BasicInfo />}
            {!isLoading && <Buttons />}
        </div>
      )}
    </div>
  );
}

DetailsFoodScreen.propTypes = {
  props: PropTypes.string.isRequired,
};
