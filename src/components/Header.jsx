import React from 'react';

function Header() {
  return (
    <div className="headerDiv">
      <i className="userProfileIcon" data-testeid="profile-top-btn" />
      <h1 className="foodTitle" data-testid="page-title">Comidas</h1>
      <i className="searchIcon" data-testid="search-top-btn" />
    </div>
  );
}

export default Header;
