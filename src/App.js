import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import DetailsDrinkScreen from './components/ExploreDrinkScreen';
// import DetailsFoodScreen from './components/DetailsFoodScreen';
// import DoneRecipes from './components';
// import ExploreDrinkIngredientScreen from './components/ExploreDrinkIngredientScreen';
// import ExploreDrinkScreen from './components/ExploreDrinkScreen';
// import ExploreFoodIngredientScreen from './components/ExploreFoodIngredientScreen';
// import ExploreFoodOriginScreen from './components/ExploreFoodOriginScreen';
// import ExploreFoodScreen from './components/ExploreFoodScreen';
// import ExploreHomeScreen from './components/ExploreHomeScreen';
// import FavoriteRecipes from './components/FavoriteRecipes';
import LoginScreen from './components/LoginScreen';
// import MainDrinkScreen from './components/MainDrinkScreen';
// import MainFoodScreen from './components/MainFoodScreen';
// import ProfileScreen from './components/ProfileScreen';
// import ProgressDrinkScreen from './components/ProgressDrinkScreen';
// import ProgressFoodScreen from './components/ProgressFoodScreen';
// import './App.css';

import AplicationProvider from './context/ContextAplication';

function App() {
  return (
    <AplicationProvider>
      <Switch>
        <Route exact path="/" component={LoginScreen} />
        {/* <Route exact path="/comidas" component={MainFoodScreen} />
        <Route exact path="/bebidas" component={MainDrinkScreen} />
        <Route exact path={`/comidas/${'id-da-receita'}`} component={DetailsFoodScreen} />
        <Route exact path={`/bebidas/${'id-da-receita'}`} component={DetailsDrinkScreen} />
        <Route exact path={`/comidas/${'id-da-receita'}/in-progress`} component={ProgressFoodScreen} />
        <Route exact path={`/bebidas/${'id-da-receita'}/in-progress`} component={ProgressDrinkScreen} />
        <Route exact path="/explorar" component={ExploreHomeScreen} />
        <Route exact path="/explorar/comidas" component={ExploreFoodScreen} />
        <Route exact path="/explorar/bebidas" component={ExploreDrinkScreen} />
        <Route exact path="/explorar/comidas/ingredientes" component={ExploreFoodIngredientScreen} />
        <Route exact path="/explorar/bebidas/ingredientes" component={ExploreDrinkIngredientScreen} />
        <Route exact path="/explorar/comidas/area" component={ExploreFoodOriginScreen} />
        <Route exact path="/perfil" component={ProfileScreen} />
        <Route exact path="/receitas-feitas" component={DoneRecipes} />
        <Route exact path="/receitas-favoritas" component={FavoriteRecipes} /> */}
      </Switch>
    </AplicationProvider>
  );
}

export default App;
