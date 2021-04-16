import React from 'react'
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import Login from '../login/Login.js'

function Favorites(props) {
    console.log(props.state.isAuth)
    return (
        <div>
            {props.state.isAuth
                ? <div>This is Favorites Page</div> 
                : <Redirect to="/login" component={Login}/>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        state: state.authReducer
    }
}

export default connect(mapStateToProps)(Favorites)