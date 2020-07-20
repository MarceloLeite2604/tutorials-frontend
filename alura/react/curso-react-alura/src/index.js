import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './index.css';
import * as serviceWorker from './serviceWorker';
import Home from './Pages/Home/Home';
import Sobre from './Pages/Sobre/Sobre'
import Livros from './Pages/Livros/Livros';
import Autores from './Pages/Autores/Autores';
import NotFound from './Pages/NotFound/NotFound';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {/* Parameter "exact" request the route matching to be absolute. */}
      <Route path='/' exact={true} component={Home}/>
      <Route path='/sobre' component={Sobre}/>
      <Route path='/livros' component={Livros}/>
      <Route path='/autores' component={Autores}/>
      <Route component={NotFound}/>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
