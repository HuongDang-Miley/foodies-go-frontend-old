import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import jwtDecode from 'jwt-decode'
import { loadFavorites, addNote, deleteNote, deletePlace } from '../../stores/actions/favActionCreator'
// import Map from '../map/Map.js'
// import Map2 from '../map/Map2.js'
import FavMap from '../map/FavMap.js'
import FavPlaceSummary from '../favPlaceSummary/FavPlaceSummary.js'
import LoginModal from '../modal/LoginModal'
import './favorites.css'
import { getUserLocation } from '../../stores/actions/authActionCreator'
import { mouseEnter } from '../../stores/actions/searchActionCreator'
import PlaceDetail from '../placeDetail/PlaceDetail'

function Favorites(props) {

    console.log('props in Favorites', props)

    // console.log('props in favorites', props)
    const history = useHistory()
    let [disableDeleteModal, setDisableDeleteModal] = useState(false)

    //============================================================================================================
    //Check for usertoken. If no token found, redirect to login page. If there is token, load favorites places 
    //============================================================================================================
    let [isAuth, setIsAuth] = useState(false)
    let [userId, setUserId] = useState('')
    let [username, setUsername] = useState('')


    useEffect(() => {
        let userToken = localStorage.getItem('userToken')
        props.getUserLocation()
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
    }, [])



    const logOut = () => {
        localStorage.removeItem('userToken')
        history.push('/')
    }


    return (
        <>
            {/* //============================================================================================================
            // Top Nav
            //============================================================================================================ */}
            <div className='topNav-wrapper'>
                <button><Link to='/'>Go Back</Link></button>
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
                <FavMap
                    mouseEnter={props.mouseEnter}
                    places={props.favList}
                // favList={props.favList} 
                />
            </div>

            {/* //============================================================================================================
            // Side Bar: 
            // If user haven't login, show modal to login. 
            // Default show FavList, if showPlaceDetail = true, show PlaceDetail
            //============================================================================================================  */}
            <div className='favList-wrapper'>
                {isAuth ?
                    <>
                        {props.showPlaceDetail
                            ? <div className='placeDetail-wrapper'><PlaceDetail /></div>
                            : <div>
                                <h3>Favorite List</h3>
                                {props.favList.length === 0
                                    ? 'Your favorites list is empty'
                                    : props.favList.map(place =>
                                        <FavPlaceSummary
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
                        }
                    </>
                    : <div>You Must Login To see your favorites<LoginModal /></div>
                }
            </div>
            {/* <div className='favList-wrapper'>
                {isAuth ?
                    <div>
                        <h3>Favorite List</h3>
                        {props.favList.length === 0
                            ? 'Your favorites list is empty'
                            : props.favList.map(place =>
                                <FavPlaceSummary
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
                    : <div>You Must Login To see your favorites<LoginModal /></div>
                }
            </div> */}
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        favList: state.favReducer.favList
    }
}

export default connect(mapStateToProps, { loadFavorites, addNote, deleteNote, deletePlace, getUserLocation, mouseEnter })(Favorites)

