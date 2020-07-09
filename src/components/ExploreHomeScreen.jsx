import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import InferiorMenu from './InferiorMenu';
import './CSS/ExploreHomeScreen.css';

function ExploreHomeScreen() {
  return (
    <div className="explore-screen">
      <Header screen={'Explorar'} />
      <div className="explore-menu fade-in-fwd ">
        <Link to="/explorar/comidas">
          <p className="explore-button" data-testid="explore-food">Explorar Comidas</p>
        </Link>
        <Link to="/explorar/bebidas">
          <p className="explore-button" data-testid="explore-drinks">Explorar Bebidas</p>
        </Link>
      </div>
      <InferiorMenu />
    </div>
  );
}

export default ExploreHomeScreen;
