import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './Home.js'
import Register from './components/register/Register.js'
import Login from './components/login/Login.js'
import Favorites from './components/favorites/Favorites.js'
import Directions from './components/directions/Directions.js'

export default function App(props) {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/favorites" component={Favorites} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/directions" component={Directions} />
      </Switch>
    </Router>
  );
}


