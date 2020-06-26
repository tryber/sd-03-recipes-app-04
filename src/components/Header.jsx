import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import './CSS/Header.css';

function Header() {
  const [isInputSearchVisible, setIsInputSearchVisible] = useState(false);

  function showHideInputSearch() {
    if (isInputSearchVisible) {
      setIsInputSearchVisible(false);
    } else {
      setIsInputSearchVisible(true);
    }
  }
  return (
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
      {isInputSearchVisible
        ? (
          <input
            type="text"
            name="search-Input"
            placeholder="Typing for search"
          />
        )
        : null}
      <button type="button" onClick={() => showHideInputSearch()}>
        <img
          src={searchIcon}
          alt="SearchIcon"
          className="searchIcon"
          data-testid="search-top-btn"
        />
      </button>
    </div>
  );
}

export default Header;
