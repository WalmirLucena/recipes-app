import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import FoodProvider from './contexts/FoodProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Comidas from './pages/Comidas';
import Bebidas from './pages/Bebidas';
import Perfil from './pages/Perfil';
import Explorar from './pages/Explorar';
import ExpComidas from './pages/ExpComidas';
import ExpBebidas from './pages/ExpBebidas';
import ExpIngComidas from './pages/ExpIngComidas';
import ExpIngBebidas from './pages/ExpIngBebidas';
import Detalhes from './pages/Detalhes';
import EmProcesso from './pages/EmProcesso';
import ExpAreaComidas from './pages/ExpAreaComidas';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import ReceitasFeitas from './pages/ReceitasFeitas';
import DrinkProvider from './contexts/DrinkProvider';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <DrinkProvider>
        <FoodProvider>
          <Switch>
            <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
            <Route path="/receitas-feitas" component={ ReceitasFeitas } />
            <Route path="/explorar/bebidas/ingredientes" component={ ExpIngBebidas } />
            <Route path="/explorar/comidas/ingredientes" component={ ExpIngComidas } />
            <Route path="/explorar/comidas/area" component={ ExpAreaComidas } />
            <Route path="/explorar/bebidas/area" component={ NotFound } />
            <Route path="/explorar/bebidas" component={ ExpBebidas } />
            <Route path="/explorar/comidas" component={ ExpComidas } />
            <Route path="/explorar" component={ Explorar } />
            <Route path="/bebidas/:idBebida/in-progress" component={ EmProcesso } />
            <Route path="/bebidas/:idBebida" component={ Detalhes } />
            <Route path="/bebidas" component={ Bebidas } />
            <Route path="/comidas/:idComida/in-progress" component={ EmProcesso } />
            <Route path="/comidas/:idComida" component={ Detalhes } />
            <Route path="/comidas" component={ Comidas } />
            <Route path="/perfil" component={ Perfil } />
            <Route exact path="/" component={ Login } />
            <Route component={ NotFound } />
          </Switch>
        </FoodProvider>
      </DrinkProvider>
    </BrowserRouter>
  );
}

export default App;
