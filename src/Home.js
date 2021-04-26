import React, { useEffect, useState } from "react";
import axios from 'axios'
import './home.css'
// import Map from './components/map/Map.js'
// import MapWrapper from './components/map/OldMapModified.js'
import FavMap from './components/map/FavMap.js'
import Map2 from './components/map/Map2.js'
// import GreenMap from './components/map/GreenMap.js'
import TopNav from './components/topNav/TopNav.js'
import Sidebar from './components/sidebar/Sidebar.js'
import { connect } from "react-redux";
import { getNearbySearch, getPlaceDetail, togglePlaceDetail } from './stores/actions/searchActionCreator'
import { getUserLocation } from './stores/actions/authActionCreator'

const key = process.env.REACT_APP_GOOGLE_API_KEY



function Home(props) {
    // props.getUserLocation()
    // console.log('key', key)
    // console.log('props in Home', props)
    // const [test, setTest] = useState('hehe')
    // useEffect(async () => {
    //         props.getUserLocation()
    // }, [])

    // console.log(test)

    return (
        <div>
            <div className='topNav-wrapper'>
                <TopNav
                    // searchResults={props.searchResults}
                    getNearbySearch={props.getNearbySearch}
                    togglePlaceDetail={props.togglePlaceDetail}
                />
            </div>

            <div className='map-wrapper'>
                <FavMap
                    places={props.places}
                    placeDetail={props.placeDetail}
                    showPlaceDetail={props.showPlaceDetail}
                />
                {/* <Map2 
                places={props.places}
                placeDetail={props.placeDetail}
                showPlaceDetail={props.showPlaceDetail}
                 /> */}
                {/* <GreenMap/> */}
                {/* <MapWrapper
                    // state={props.searchResults}
                    state={props.places}
                    getNearbySearch={props.getNearbySearch}
                /> */}
                {/* {props.showPlaceDetail
                    ? <Map places={[props.placeDetail]} /> //=> place detail
                    : <Map places={props.places} /> //=> nearby search
                } */}
            </div>
            {props.places.length === 0
                ? null
                : <div className='sidebar-wrapper'>
                    <Sidebar
                        showPlaceDetail={props.showPlaceDetail}
                        placeDetail={props.placeDetail}
                        togglePlaceDetail={props.togglePlaceDetail}
                        places={props.places}
                        getPlaceDetail={props.getPlaceDetail}
                    // searchResults={props.searchResults}

                    />
                </div>
            }
        </div>
    );
}


const mapStateToProps = (state) => {
    return {
        places: state.searchReducer.places,
        showPlaceDetail: state.searchReducer.showPlaceDetail,
        placeDetail: state.searchReducer.placeDetail,
        userLocation: state.authReducer.userLocation
        // searchResults: state.searchReducer,
        // isAuth: state.authrReducer,
        // markers: state.mapReducer
    }
}

export default connect(mapStateToProps, { getNearbySearch, getPlaceDetail, togglePlaceDetail, getUserLocation })(Home)
