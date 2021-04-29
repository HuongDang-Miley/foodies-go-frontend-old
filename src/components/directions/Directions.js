import React, { useState, useEffect, } from 'react'
import './directions.css'
import { useHistory, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import DirectionsMap from '../map/DirectionsMap.js'
import TopNav from '../topNav/TopNav.js'
import CopyMap from '../map/CopyMap';
import HardCodeMap from '../map/HardCodeMap';
import MapJs from '../map/MapJs';
import DirectionMapJs from '../map/DirectionsMapJs';
import UdaciMap from '../map/UdaciMap';
import RoutesMap from '../map/RoutesMap';
import { getVenues } from '../../stores/actions/mapActionCreator'

function Directions(props) {
    // console.log('props in Direction', props)
    const history = useHistory()

    return (
        <div>
            <div className='topNav-wrapper'>
                <button onClick={() => history.push('/home')}>Go Back</button>
                <TopNav />
            </div>

            {/* //============================================================================================================
            // Map
            //============================================================================================================ */}

            <div className='map-wrapper'>
                <RoutesMap
                    placeDetail={props.placeDetail}
                    userLatLng={props.userLatLng}
                    userLocation={props.userLocation}
                />
                {/* <MapJs 
                    placeDetail={props.placeDetail}
                    userLatLng={props.userLatLng}
                /> */}
                {/* <UdaciMap
                    placeDetail={props.placeDetail}
                    userLatLng={props.userLatLng}
                /> */}
            </div>
            <div className='directions-wrapper'>
                <div className='mode-buttons'>
                    <button>Driving</button>
                    <button>Walking</button>
                    <button>Transit</button>
                    <button>Byciling</button>
                </div>
                <form>
                    <input />
                    <input />
                    <button>Go</button>
                </form>

            </div>

        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        places: state.searchReducer.places,
        showPlaceDetail: state.searchReducer.showPlaceDetail,
        placeDetail: state.searchReducer.placeDetail,
        hoveredPlace: state.searchReducer.hoveredPlace,
        userLocation: state.authReducer.userLocation,
        keyword: state.searchReducer.keyword,
        userLatLng: state.authReducer.userLatLng,
        venues: state.mapReducer.venues
    }
}

export default connect(mapStateToProps, { getVenues })(Directions)



//
 //============================================================================================================
            // Side Bar
            //============================================================================================================
//  <div className='directions-wrapper'>
//                 <span>Car</span>
//                 <span>Walk</span>
//                 <span>Bike</span>
//                 <span>Bus</span>
//                 <br />
//                 <form>
//                     <input></input>
//                     <br />
//                     <input></input>
//                     <br />
//                     <button>{'Go ->'}</button>
//                 </form>
//             </div> */}