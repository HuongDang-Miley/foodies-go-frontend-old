import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import jwtDecode from 'jwt-decode'
import { loadFavorites, addNote, deleteNote, deletePlace } from '../../stores/actions/favActionCreator'
import Map from '../map/Map.js'
import Map2 from '../map/Map2.js'
import FavPlaceDetail from '../favPlaceDetail/FavPlaceDetail.js'
import LoginModal from '../modal/LoginModal'
import './favorites.css'

function Favorites(props) {
    // console.log('props in favorites', props)
    const history = useHistory()
    let [disableDeleteModal, setDisableDeleteModal] = useState(false)

    //============================================================================================================
    //Check for usertoken. If no token found, redirect to login page. If there is token, load favorites places 
    //============================================================================================================
    let [isAuth, setIsAuth] = useState(false)
    let [userId, setUserId] = useState('')
    let [username, setUsername] = useState('')
    let userToken = localStorage.getItem('userToken')

    
    useEffect(() => {
        // let userToken = localStorage.getItem('userToken')
        if (userToken) {
            setIsAuth(true)
            console.log('isAuth inside if', isAuth)
            let userInfo = jwtDecode(userToken)
            props.loadFavorites(userInfo.id)
            setUserId(userInfo.id)
            setUsername(userInfo.username)
        } else {
            setIsAuth(false)
        }
    },[userToken])

    console.log('userId', userId)

    const logOut = () => {
        localStorage.removeItem('userToken')
        history.push('/home')
    }


    return (
        <>
            {/* //============================================================================================================
            // Top Nav
            //============================================================================================================ */}
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

            {/* //============================================================================================================
            // Map
            //============================================================================================================ */}
            <div className='map-wrapper'>
                {/* <Map places={props.favList} /> */}
                {/* <Map2 places={props.favList} /> */}
            </div>

            {/* //============================================================================================================
            // Side Bar
            //============================================================================================================  */}
            <div className='sidebar-wrapper'>
                {isAuth ?
                    <div>
                        <h3>Favorite List</h3>
                        {props.favList.length === 0
                            ? 'Your favorites list is empty'
                            : props.favList.map(place =>
                                <FavPlaceDetail
                                    key={place.place_id}
                                    disableDeleteModal={disableDeleteModal}
                                    setDisableDeleteModal={setDisableDeleteModal}
                                    deletePlace={props.deletePlace}
                                    deleteNote={props.deleteNote}
                                    favList={props.favList}
                                    place={place}
                                    userId={userId}
                                    addNote={props.addNote} />)}
                    </div>
                    : <p>You Must Login To see your favorites<LoginModal /></p>
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

