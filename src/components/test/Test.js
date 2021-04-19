import React, { useState, useEffect } from 'react'
import { Route, Redirect, useHistory, NavLink, Link } from 'react-router-dom';

export default function Test() {
    let history = useHistory()
    let [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        let userToken = localStorage.getItem('userToken')
        if (userToken) {
            setIsAuth(true)
        } else {
            setIsAuth(false)
        }
    })



    return (
        <div>
            {isAuth ? 'There is token ' : 'Please Login to see data'}
            {/* {isAuth ? 'There is token ' : 'no token'} */}
            {/* {isAuth ? 'This is Test page' : <Redirect to='/login' />} */}
            {/* {isAuth ? 'This is Test page' : <Route><Redirect to='/login' /></Route>} */}
        </div>
    )
}
