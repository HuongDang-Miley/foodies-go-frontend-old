import React, { useRef, useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom';
// import Favorites from '../favorites/Favorites.js'
import './topNav.css'

export default function TopNav(props) {
    const history = useHistory()
    let searchRef = useRef()

    //=========================== Check if there is a token ===========================
    let [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        let userToken = localStorage.getItem('userToken')
        if (userToken) {
            setIsAuth(true)
        } else {
            setIsAuth(false)
        }
    }, [])

    const handleSearch = (event) => {
        event.preventDefault()
        props.togglePlaceDetail(false)
        props.getNearbySearch(searchRef.current.value)
        searchRef.current.value = ''
        history.push('./home')
    }

    const logOut = () => {
        localStorage.removeItem('userToken')
        history.push('/home')
    }


    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    ref={searchRef}
                    placeholder='Search Place'></input>
                <button>Search</button>
            </form>
            <div className='topnav-right-buttons-wrapper'>
            <button><Link to='/favorites'>Favorites</Link></button>
            {isAuth
                ? <button onClick={() => logOut()}>Logout</button>
                : <button><Link to='/login'>Login</Link></button>}
            </div>
        </div>
    )
}

