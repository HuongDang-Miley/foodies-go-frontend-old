import React, { useRef, useEffect, useState } from 'react'
import { connect } from "react-redux";
import './topNav.css'
import { useHistory, Link } from 'react-router-dom';
import { getNearbySearch, togglePlaceDetail } from '../../stores/actions/searchActionCreator'
import { getUserLocation } from '../../stores/actions/authActionCreator'

function TopNav(props) {
    const history = useHistory()
    let searchRef = useRef()

    //=========================== Check if there is a token ===========================
    let [isAuth, setIsAuth] = useState(false)

    let getUserToken = async () => {
        let userToken = await localStorage.getItem('userToken')
        if (userToken) {
            setIsAuth(true)
        } else {
            setIsAuth(false)
        }
    }

    useEffect(() => {
        props.getUserLocation()
        // let getUserToken = async () => {
        //     let userToken = await localStorage.getItem('userToken')
        //     if (userToken) {
        //         setIsAuth(true)
        //     } else {
        //         setIsAuth(false)
        //     }
        // }
        getUserToken()
    }, [])


    // console.log('isAuth from TopNav', isAuth)

    const handleSearch = (event) => {
        event.preventDefault()
        props.togglePlaceDetail(false)
        props.getNearbySearch(searchRef.current.value)
        searchRef.current.value = ''
        history.push('./home')
    }

    const logOut = async () => {
        await localStorage.removeItem('userToken')
        setIsAuth(false)
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

const mapStateToProps = (state) => {
    return {
        userLocation: state.authReducer.userLocation
    }
}
export default connect(mapStateToProps, { getUserLocation, getNearbySearch, togglePlaceDetail })(TopNav)
