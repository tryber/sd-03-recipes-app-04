import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DetailsDrinkScreen from './components/DetailsDrinkScreen';
import DetailsFoodScreen from './components/DetailsFoodScreen';
import DoneRecipes from './components/DoneRecipes';
import ExploreDrinkIngredientScreen from './components/ExploreDrinkIngredientScreen';
import ExploreDrinkScreen from './components/ExploreDrinkScreen';
import ExploreFoodIngredientScreen from './components/ExploreFoodIngredientScreen';
import ExploreFoodOriginScreen from './components/ExploreFoodOriginScreen';
import ExploreFoodScreen from './components/ExploreFoodScreen';
import ExploreHomeScreen from './components/ExploreHomeScreen';
import FavoriteRecipes from './components/FavoriteRecipes';
import LoginScreen from './components/LoginScreen';
import MainDrinkScreen from './components/MainDrinkScreen';
import MainFoodScreen from './components/MainFoodScreen';
import ProfileScreen from './components/ProfileScreen';
import ProgressDrinkScreen from './components/ProgressDrinkScreen';
import ProgressFoodScreen from './components/ProgressFoodScreen';
import NotFound from './components/NotFound';
import WelcomeScreen from './components/WelcomeScreen';
import './App.css';

import AplicationProvider from './context/ContextAplication';

function App() {
  return (
    <AplicationProvider>
      <Switch>
        <Route exact path="/" component={LoginScreen} />
        <Route exact path="/welcome" component={WelcomeScreen} />
        <Route exact path="/comidas" component={MainFoodScreen} />
        <Route exact path="/bebidas" component={MainDrinkScreen} />
        <Route exact path="/comidas/:id" render={(props) => <DetailsFoodScreen props={props} />} />
        <Route exact path="/bebidas/:id" render={(props) => <DetailsDrinkScreen props={props} />} />
        <Route exact path="/comidas/:id/in-progress" component={ProgressFoodScreen} />
        <Route exact path="/bebidas/:id/in-progress" component={ProgressDrinkScreen} />
        <Route exact path="/explorar" component={ExploreHomeScreen} />
        <Route exact path="/explorar/comidas" component={ExploreFoodScreen} />
        <Route exact path="/explorar/bebidas" component={ExploreDrinkScreen} />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ExploreFoodIngredientScreen}
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ExploreDrinkIngredientScreen}
        />
        <Route exact path="/explorar/comidas/area" component={ExploreFoodOriginScreen} />
        <Route exact path="/perfil" component={ProfileScreen} />
        <Route exact path="/receitas-feitas" component={DoneRecipes} />
        <Route exact path="/receitas-favoritas" component={FavoriteRecipes} />
        <Route component={NotFound} />
      </Switch>
    </AplicationProvider>
  );
}

export default App;
