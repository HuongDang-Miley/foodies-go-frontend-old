import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import Home from './Home.js'
import Register from './components/register/Register.js'
import Login from './components/login/Login.js'
import Favorites from './components/favorites/Favorites.js'
import PrivateRoute from './components/privateRoute/PrivateRoute.js'
import Test from './components/test/Test.js'

function App(props) {
  return (
    <Router>
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/favorites" component={Favorites} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/test" component={Test} />
      </Switch>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return { state: state.authReducer }
}
export default connect(mapStateToProps)(App);

{/* <PrivateRoute exact path="/Favorites" component={Favorites} state={props.state} /> */ }