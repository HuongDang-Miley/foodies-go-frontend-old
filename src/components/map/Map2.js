

import React, { useState, useCallback, useEffect } from 'react'
import axios from 'axios'
import { GoogleMap, useLoadScript, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { connect } from "react-redux";
import { getNearbySearch, getPlaceDetail, togglePlaceDetail } from '../../stores/actions/searchActionCreator'

const libraries = ['places']
const mapContainerStyle = {
    width: '100vw',
    height: '100vh'
}

// const center = {
//     lat: 45.4211,
//     lng: -75.6903
// }

// const option = {
//     // disableDefaultUI: true
// }

// IPv4: "173.70.139.74"
// city: "Weehawken"
// country_code: "US"
// country_name: "United States"
// latitude: 40.7681
// longitude: -74.0208
// postal: "07086"
// state: "New Jersey"

function Map2(props) {
    // console.log('props in Map2', props)

    const [userLocation, setUserLocation] = useState(null)
    const [showUserAddress, setShowUserAddress] = useState(false)
    const [userAddress, setUserAdress] = useState(null)
    const [showPlaceDetailInfoWindow, setShowPlaceDetailInfoWindow] = useState(true)
    const [marker, setMaker] = useState(null)
    const [selected, setSelected] = useState(null)



    useEffect(async () => {
        let response = await axios.get('https://geolocation-db.com/json/f9902210-97f0-11eb-a459-b997d30983f1')
        setUserLocation({ lat: response.data.latitude, lng: response.data.longitude })
        setUserAdress({
            city: response.data.city,
            country_code: response.data.country_code,
            country_name: response.data.country_name,
            postal: response.data.postal,
            state: response.data.state,
        })
    }, [])

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyALhFgmCW6bVy6JdBOF_ccNtu1NgrfRxiw',
        libraries,
    });

    // console.log('showPlaceDetailInfoWindow', showPlaceDetailInfoWindow)

    const onMapCLick = useCallback((event) => {
        setMaker({
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        })
    }, [])

    if (loadError) return 'Error Loading Map'
    if (!isLoaded) return 'Loading Maps'


    return (
        <div className="App">
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={13}
                center={userLocation}
            // onClick={onMapCLick}
            // onload={onMapLoad}
            >

/******************************************************************************************************************************
*                     Show user marker and InfoWindow if clicked
******************************************************************************************************************************/

                <Marker position={userLocation} icon='skateboarding.svg' onClick={() => {
                    setShowUserAddress(true)
                    setSelected(null)
                }} />

                {showUserAddress ? <InfoWindow position={userLocation} onCloseClick={() => { setShowUserAddress(false) }}>
                    <div>
                        <p>My Address:</p>
                        <p>{`${userAddress.city}  ${userAddress.state}, ${userAddress.postal} ${userAddress.country_name}`}</p>
                    </div>
                </InfoWindow> : null}


/******************************************************************************************************************************
*                     Show PlaceDetail marker and InfoWindow if clicked
******************************************************************************************************************************/
                {props.showPlaceDetail && props.placeDetail && showPlaceDetailInfoWindow ?
                    <>
                        {/* <Marker
                            position={props.placeDetail.geometry.location}
                            icon='favicon.ico'
                            onClick={() => {
                                setShowPlaceDetailInfoWindow(true)
                                setShowUserAddress(false)
                                setSelected(null)
                            }}
                        /> */}
                        <InfoWindow position={props.placeDetail.geometry.location}
                            onClick={() => setShowPlaceDetailInfoWindow(false)}
                        ><div>{props.placeDetail.name}</div></InfoWindow>
                    </> : null
                }

/******************************************************************************************************************************
*                     Show marker of places from search result and InfoWindow if clicked
******************************************************************************************************************************/

                {props.places.map((item) =>
                    <Marker
                        // icon={props.showPlaceDetail ? 'favicon.ico' : null }
                        key={item.place_id}
                        position={{
                            lat: item.geometry.location.lat,
                            lng: item.geometry.location.lng
                        }}
                        onClick={() => {
                            setSelected(item)
                            setShowUserAddress(false)
                        }}
                    />
                )}

                {selected ?
                    <InfoWindow
                        onCloseClick={() => { setSelected(null) }}
                        position={selected.geometry.location}
                    >
                        <div>
                            <h3>{selected.name}</h3>
                            <h3>{selected.rating}</h3>
                        </div>
                    </InfoWindow> : null}

            </GoogleMap>
        </div>
    );
}

// export default Map2;
const mapStateToProps = (state) => {
    return {
        places: state.searchReducer.places,
    }
}
export default connect(mapStateToProps, { getNearbySearch, getPlaceDetail, togglePlaceDetail })(Map2)
