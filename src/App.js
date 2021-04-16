import React from "react";
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Home from './Home.js'
import Register from './components/register/Register.js'
import Login from './components/login/Login.js'
import Favorites from './components/favorites/Favorites.js'

function App(props) {
  return (
    <Router>
      <Route exact path="/home" component={Home} />
      <Switch>
      <Route exact path="/Favorites" component={Favorites} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login}/>
      </Switch>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return { state: state.authReducer }
}
export default connect(mapStateToProps)(App);

