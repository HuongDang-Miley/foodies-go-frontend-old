import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import jwtDecode from 'jwt-decode'
import { loadFavorites, addNote, deleteNote, deletePlace } from '../../stores/actions/favActionCreator'
import MapWrapper from '../map/Map.js'
import FavPlaceDetail from '../favPlaceDetail/FavPlaceDetail.js'
import './favorites.css'

function Favorites(props) {
    // console.log('props in favorites', props)
    const history = useHistory()

    //============================================================================================================
    //Check for usertoken. If no token found, redirect to login page. If there is token, load favorites places 
    //============================================================================================================
    let [isAuth, setIsAuth] = useState(false)
    let [userId, setUserId] = useState('')
    let [username, setUsername] = useState('')

    useEffect(() => {
        let userToken = localStorage.getItem('userToken')
        if (userToken) {
            setIsAuth(true)
            let userInfo = jwtDecode(userToken)
            props.loadFavorites(userInfo.id)
            setUserId(userInfo.id)
            setUsername(userInfo.username)
        } else {
            setIsAuth(false)
        }
    }, [])

    const logOut = () => {
        localStorage.removeItem('userToken')
        history.push('/home')
    }


    return (
        <>
            //============================================================================================================
            // Top Nav
            //============================================================================================================
            <div className='topNav-wrapper'>
                
                <button><Link to='/home'>Go Back</Link></button>
                <div className='topnav-right-buttons-wrapper'>
                    <p>{username}</p>
                    {isAuth
                        ? <button onClick={() => logOut()}>Logout</button>
                        : <button><Link to='/login'>Login</Link></button>
                    }
                </div>
            </div>

            //============================================================================================================
            // Map
            //============================================================================================================
            <div className='map-wrapper'>
                {/* <MapWrapper
                    state={props.searchResults}
                    getNearbySearch={props.getNearbySearch}
                /> */}
            </div>

            //============================================================================================================
            // Side Bar
            //============================================================================================================
            <div className='sidebar-wrapper'>
                {isAuth
                    ? <div>
                        <h3>Favorite List</h3>
                        {props.favList.length === 0
                            ? 'Your favorites list is empty'
                            : props.favList.map(place =>
                                <FavPlaceDetail
                                    deletePlace={props.deletePlace}
                                    deleteNote={props.deleteNote}
                                    favList={props.favList}
                                    place={place}
                                    userId={userId}
                                    addNote={props.addNote} />)}
                    </div>
                    : <p>You Must Login To see your favorites</p>
                }
            </div>
        </>
    );


}

const mapStateToProps = (state) => {
    return {
        favList: state.favReducer.favList
    }
}

export default connect(mapStateToProps, { loadFavorites, addNote, deleteNote, deletePlace })(Favorites)

