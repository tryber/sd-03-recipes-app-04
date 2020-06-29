import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import { ContextAplication } from '../context/ContextAplication';
import './CSS/Header.css';
import FoodSearchBar from './FoodSearchBar';
import DrinkSearchBar from './DrinkSearchBar';


function Header(props) {
  const { screen } = props;
  const [isInputSearchVisible, setIsInputSearchVisible] = useState(false);
  const { searchInput, searchInputVisible } = useContext(ContextAplication);
  function ShowHideInputSearch() {
    console.log(searchInputVisible, isInputSearchVisible);
    if (isInputSearchVisible) {
      setIsInputSearchVisible(false);
      // if context for false set it as true to show input Search
      searchInput(true);
    } else if (!isInputSearchVisible) {
      setIsInputSearchVisible(true);
      // if context for true set it as false to hidde input Search
      searchInput(false);
    }
  }
  return (
    <div>
      <div className="headerDiv">
        <Link to="/perfil">
          <img
            className="userProfileIcon"
            src={profileIcon}
            alt="ProfileIcon"
            data-testeid="profile-top-btn"
          />
        </Link>
        <h1 className="foodTitle" data-testid="page-title">Comidas</h1>
        <button type="button" className="searchIcon" onClick={() => ShowHideInputSearch()}>
          <img
            src={searchIcon}
            alt="SearchIcon"
            data-testid="search-top-btn"
          />
        </button>
      </div>
      {isInputSearchVisible && (screen === 'food') && <FoodSearchBar />}
      {isInputSearchVisible && (screen === 'drink') && <DrinkSearchBar />}
    </div>
  );
}

export default Header;

Header.propTypes = {
  screen: PropTypes.string.isRequired,
};
