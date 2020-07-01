import React from 'react';
import { Link } from 'react-router-dom';
import InferiorMenu from './InferiorMenu';
import icon from '../images/profileIcon.svg';
import '../components/CSS/ProfileScreen.css';

function header() {
  return (
    <div className="header-profile">
      <img src={icon} alt="Icone perfil" />
      <p>Perfil</p>
    </div>
  );
}

function ProfileScreen() {
  const { email } = JSON.parse(localStorage.getItem('user'));
  return (
    <div className="container-profile">
      {header()}
      <h1 data-testid="profile-email">{email}</h1>
      <Link to="/receitas-feitas" data-testid="profile-done-btn">
        <button type="button">Receitas Feitas</button>
      </Link>
      <Link to="/receitas-favoritas" data-testid="profile-favorite-btn">
        <button type="button">Receitas Favoritas</button>
      </Link>
      <Link to="/" data-testid="profile-logout-btn">
        <button type="button" onClick={() => localStorage.clear()}>Sair</button>
      </Link>
      <InferiorMenu />
    </div>
  );
}

export default ProfileScreen;
