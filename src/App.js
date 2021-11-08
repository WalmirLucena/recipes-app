import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MealProvider from './contexts/MealProvider';
import Login from './pages/Login';
import Comidas from './pages/Comidas';

function App() {
  return (
    <BrowserRouter>
      <MealProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/comidas" component={ Comidas } />
        </Switch>
      </MealProvider>
    </BrowserRouter>
  );
}

export default App;
