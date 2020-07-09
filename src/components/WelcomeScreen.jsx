import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import './CSS/WelcomeScreen.css';

function WelcomeScreen() {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    setTimeout(() => setRedirect(true), 4000);
  });

  return (
    <div className="welcome-screen">
      <div className="welcome-phrase">
        Welcome!
      </div>
      {redirect && <Redirect to="/comidas" />}
    </div>
  );
}

export default WelcomeScreen;
