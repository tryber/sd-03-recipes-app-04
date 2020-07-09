import React from 'react';
import { Link } from 'react-router-dom';
import InferiorMenu from './InferiorMenu';
import Header from './Header';
import './CSS/ProfileScreen.css';

function ProfileScreen() {
  const { email } = (JSON.parse(localStorage.getItem('user')) || { email: null });
  return (
    <div className="container-profile">
      <Header screen="Perfil" />
      <div className="profile-screen-buttons">
        <p data-testid="profile-email">{email}</p>
        <Link to="/receitas-feitas" data-testid="profile-done-btn">
          <button type="button">Receitas Feitas</button>
        </Link>
        <Link to="/receitas-favoritas" data-testid="profile-favorite-btn">
          <button type="button">Receitas Favoritas</button>
        </Link>
        <Link to="/" data-testid="profile-logout-btn">
          <button type="button" onClick={() => localStorage.clear()}>Sair</button>
        </Link>
      </div>
      <InferiorMenu />
    </div>
  );
}

export default ProfileScreen;
