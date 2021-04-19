import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

export default function PrivateRoute(props) {
    console.log('props in privateroute ', props)
    return (
        <div>
            {props.state.isAuth ? 'this is private route component' : <Redirect to='/login'/>}
            {/* <Route component={props.Favorite}></Route> */}
        </div>
    )
}
