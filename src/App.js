import React, { useEffect, useState } from "react";
import axios from 'axios'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import Home from './Home.js'
import Register from './components/register/Register.js'
import Login from './components/login/Login.js'
import Favorites from './components/favorites/Favorites.js'
import { getUserLocation } from './stores/actions/authActionCreator'

function App(props) {
  return (
    <Router>
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/favorites" component={Favorites} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return { state: state.authReducer }
}
export default connect(mapStateToProps, {getUserLocation})(App);

