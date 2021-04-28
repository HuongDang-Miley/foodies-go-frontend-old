
import React, { useState, useEffect, useCallback } from 'react'
import { connect } from "react-redux";
import { GoogleMap, useLoadScript, Marker, InfoWindow, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';
import routes from '../../data/routes.json'
// import { getNearbySearch, getPlaceDetail, togglePlaceDetail } from '../../stores/actions/searchActionCreator'
// import { getUserLocation } from '../../stores/actions/authActionCreator'


const libraries = ['places']
const mapContainerStyle = {
    width: '100vw',
    height: '100vh'
}

const center = {
    lat: 40.7834345,
    lng: -73.9662495
}


// destination: { lat: 40.7386556, lng: -74.02963889999999 }, //=> place detail
// origin: { lat: 40.7681, lng: -74.0208 }, //=> userLocation
// travelMode: 'DRIVING', //=> input
let startLocation
let endlocation
let travelTime
let userLocation
let centerLocation

function DirectionsMap(props) {

    // console.log('routes', routes)

    /******************************************************************************************************************************
    *                   Declare vairable
    ******************************************************************************************************************************/

    let [directions, setDirections] = useState("");
    const [selected, setSelected] = useState(null)
    const [userAddress, setUserAddress] = useState(null)
    const [showPlaceDetailInfoWindow, setShowPlaceDetailInfoWindow] = useState(true)
    // const [centerLocation, setCenterLocation] = useState({
    //     lat: 40.7834345,
    //     lng: -73.9662495
    // })

    startLocation = { lat: props.userLocation.latitude, lng: props.userLocation.longitude }
    endlocation = { lat: props.placeDetail.geometry.location.lat, lng: props.placeDetail.geometry.location.lng }
    centerLocation = { lat: props.userLocation.latitude, lng: props.userLocation.longitude }




    const [startPoint, setStartPoint] = useState(null)
    const [endPoint, setEndPoint] = useState(null)
    const [travelMode, setTravelMode] = useState("WALKING")



    /******************************************************************************************************************************
    *                    Functions
    ******************************************************************************************************************************/
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyALhFgmCW6bVy6JdBOF_ccNtu1NgrfRxiw',
        libraries,
    });

    // useEffect(() => {
    //     if (props.userLocation) {
    //         setCenterLocation({ lat: props.userLocation.latitude, lng: props.userLocation.longitude })
    //     }
    // }, [props.userLocation])


    // console.log('endlocation in DirectionsMap', endlocation)
    // console.log('startLocation location in DirectionsMap', startLocation)



    // const directionsCallback = (response) => {
    //     console.log('response', response)
    //     if (response !== null) {
    //         if (response.status === 'OK') {
    //             setDirections(response)
    //             travelTime = {
    //                 duration: response.routes[0].legs[0].duration.text,
    //                 distance: response.routes[0].legs[0].distance.text,
    //                 startAddress: response.routes[0].legs[0].start_address,
    //                 endAddress: response.routes[0].legs[0].end_address,
    //             }

    //         } else if (response.code === 'OVER_QUERY_LIMIT') {
    //             setTimeout(setDirections(response), 1000)
    //             console.log('it run  over_query-lidmit')
    //         }
    //         else {
    //             console.log('response: ', response)
    //         }
    //     }
    // }

    const directionsCallback = useCallback((response, status) => {
        console.log('response', response)
        if (response !== null) {
            if (response.status === 'OK') {
                setTimeout(setDirections(response), 3000)
                // setDirections(response)
                travelTime = {
                    duration: response.routes[0].legs[0].duration.text,
                    distance: response.routes[0].legs[0].distance.text,
                    startAddress: response.routes[0].legs[0].start_address,
                    endAddress: response.routes[0].legs[0].end_address,
                }
                console.log('status', status)
                
            } 
            // else if (response.code === 'OVER_QUERY_LIMIT') {
            //     setTimeout(setDirections(response), 3000)
            //     console.log('it run  over_query-lidmit')
            // }
            else {
                console.log('response.code: ', response)
            }
        }
    }, [startLocation, endlocation, props.travelMode])



    // console.log('travleTime', travelTime)

    if (loadError) return 'Error Loading Map'
    if (!isLoaded) return 'Loading Maps'

    /******************************************************************************************************************************
    *                     Return Map
    ******************************************************************************************************************************/
    return (
        <div className="DirectionsMap">
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={13}
                center={centerLocation}
            >

                /******************************************************************************************************************************
                *                     Show user marker and InfoWindow if clicked
                ******************************************************************************************************************************/
                {props.userLocation ?
                    <>
                        <Marker
                            icon='favicon.ico'
                            position={centerLocation}
                            onClick={() => {
                                setUserAddress(props.userLocation)
                                setSelected(null)
                                // setShowPlaceDetailInfoWindow(false)
                            }}
                        />
                        {userAddress ?
                            <InfoWindow
                                position={centerLocation}
                                onCloseClick={() => { setUserAddress(null) }}
                            ><div>
                                    <p>My Location:</p>
                                    <p>{`${userAddress.city}  ${userAddress.state}, ${userAddress.postal} ${userAddress.country_code}`}</p>
                                </div></InfoWindow> : null}
                    </> : null
                }


/******************************************************************************************************************************
*                     Show Direction
******************************************************************************************************************************/

               <DirectionsService
                    options={{
                        origin: startLocation,
                        destination: endlocation,
                        travelMode: props.travelMode
                    }}
                    callback={directionsCallback}
                />
                {directions ? <DirectionsRenderer options={{ directions }} /> : null}
                {/* <InfoWindow
                    onCloseClick={() => { setSelected(null) }}
                    position={props.placeDetail.geometry.location}
                >
                    <div><h3>{travelTime.duration}</h3></div>
                </InfoWindow> */}

            </GoogleMap>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        travelMode: state.mapReducer.travelMode,
        placeDetail: state.searchReducer.placeDetail,
        hoveredPlace: state.searchReducer.hoveredPlace,
        userLocation: state.authReducer.userLocation,
        userLatLng: state.authReducer.userLatLng
    }
}
export default connect(mapStateToProps)(DirectionsMap)
