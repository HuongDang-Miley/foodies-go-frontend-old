import React, { useState, useEffect, } from 'react'
import './directions.css'
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux'
import TopNav from '../topNav/TopNav.js'
import { Autocomplete } from '@react-google-maps/api';

// import DirectionsMap from '../map/DirectionsMap.js'
// import CopyMap from '../map/CopyMap';
// import HardCodeMap from '../map/HardCodeMap';
// import MapJs from '../map/MapJs';
// import DirectionMapJs from '../map/DirectionsMapJs';
// import UdaciMap from '../map/UdaciMap';
import RoutesMap from '../map/RoutesMap';
import { getVenues, getTravelMode } from '../../stores/actions/mapActionCreator'

function Directions(props) {
    // console.log('props in Direction', props.userLocation)
    const history = useHistory()

    /******************************************************************************************************************************
    *                     Auto Complete Search Function
    ******************************************************************************************************************************/
    // const [autocomplete, setAutocomplete] = useState(null)

    // const onLoad = (autocomplete) => {
    //     setAutocomplete(autocomplete)
    //     console.log('autocomplete: ', autocomplete)
    // }

    // const onPlaceChanged = () => {
    //     if (autocomplete !== null) {
    //         let place = autocomplete.getPlace()
    //         console.log('place lat', place.geometry.location.lat())
    //         console.log('place long', place.geometry.location.lng())
    //     } else {
    //         console.log('Autocomplete is not loaded yet!')
    //     }
    // }



    return (
        <div>
            <div className='topNav-wrapper'>
                <button onClick={() => history.push('/')}>Go Back</button>
                <TopNav />
            </div>

            {/* //============================================================================================================
            // Map
            //============================================================================================================ */}

            <div className='map-wrapper'>
                <RoutesMap />
            </div>

            {/* <div className='directions-wrapper'>
                
                    <Autocomplete
                        onLoad={onLoad}
                        onPlaceChanged={onPlaceChanged}
                    >
                        <input
                            className='autocomplete-input'
                            type="text"
                            placeholder="Customized your placeholder"
                        />
                    </Autocomplete>
               
            </div> */}

        </div>
    )
}



const mapStateToProps = (state) => {
    return {
        placeDetail: state.searchReducer.placeDetail,
        userLocation: state.authReducer.userLocation,
        userLatLng: state.authReducer.userLatLng,
        travelMode: state.mapReducer.travelMode,
        distance: state.mapReducer.distance,
        duration: state.mapReducer.duration,
    }
}

export default connect(mapStateToProps, { getVenues, getTravelMode })(Directions)



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



    // Old Maps:

//     < MapJs
// placeDetail = { props.placeDetail }
// userLatLng = { props.userLatLng }
//     />
//     <UdaciMap
//         placeDetail={props.placeDetail}
//         userLatLng={props.userLatLng}
//     />



//==============Setting autocomplete
{/* <div className='directions-wrapper'>
                <div className='mode-buttons'>
                    <button onClick={() => props.getTravelMode('DRIVING')}>DRIVING</button>
                    <button onClick={() => props.getTravelMode('WALKING')}>WALKING</button>
                    <button onClick={() => props.getTravelMode('TRANSIT')}>TRANSIT</button>
                    <button onClick={() => props.getTravelMode('BICYCLING')}>BICYCLING</button>
                </div>
                <form>

                    <br />
                    <input id='to' placeholder={props.placeDetail.name} />
                    <br />
                    <button>Go</button>
                </form>
                <p>{props.distance}</p>
                <p>{props.duration}</p>
                <div>
                    <Autocomplete
                        onLoad={onLoad}
                        onPlaceChanged={onPlaceChanged}
                    >
                        <input
                            className='autocomplete-input'
                            type="text"
                            placeholder="Customized your placeholder"
                        />
                    </Autocomplete>
                </div>
            </div> */}
