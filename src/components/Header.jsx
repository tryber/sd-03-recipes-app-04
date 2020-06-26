import React, { useState } from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import './Header.css';

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
      <img className="userProfileIcon" src={profileIcon} alt="ProfileIcon" data-testeid="profile-top-btn" />
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

      <img
        src={searchIcon}
        alt="SearchIcon"
        className="searchIcon"
        data-testid="search-top-btn"
      />
    </div>
  );
}

export default Header;
