
import React, { useState, useCallback, useReducer, useEffect } from 'react'
import { connect } from "react-redux";
import { GoogleMap, useLoadScript, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { getUserLocation } from '../../stores/actions/authActionCreator'


const libraries = ['places']
const mapContainerStyle = {
    width: '100vw',
    height: '100vh'
}

// const center = {
//     lat: 40.7834345,
//     lng: -73.9662495
// }


function FavMap(props) {
    console.log('props in FavMap', props)

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyALhFgmCW6bVy6JdBOF_ccNtu1NgrfRxiw',
        libraries,
    });

    const [marker, setMaker] = useState(null)
    const [selected, setSelected] = useState(null)
    const [centerLocation, setCenterLocation] = useState({
        lat: 40.7834345,
        lng: -73.9662495
    })
    const [userAddress, setUserAddress] = useState(null)
    const [showPlaceDetailInfoWindow, setShowPlaceDetailInfoWindow] = useState(true)

    useEffect(() => {
        if (props.userLocation) {
            setCenterLocation({ lat: props.userLocation.latitude, lng: props.userLocation.longitude })
        }
    }, [])


    const onMapCLick = useCallback((event) => {
        setMaker({
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        })
    }, [])

    if (loadError) return 'Error Loading Map'
    if (!isLoaded) return 'Loading Maps'

    return (
        <div className="FavMap">
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={13}
                center={centerLocation}
                onClick={onMapCLick}
            >

                {props.userLocation ?
                    <>
                        <Marker
                            icon='favicon.ico'
                            position={centerLocation}
                            onClick={() => {
                                setUserAddress(props.userLocation)
                                setSelected(null)
                                setShowPlaceDetailInfoWindow(false)
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


                {props.places.map((item) =>
                    <Marker
                        key={item.place_id}
                        position={{
                            lat: item.geometry.location.lat,
                            lng: item.geometry.location.lng
                        }}
                        onClick={() => {
                            setSelected(item)
                            setUserAddress(false)
                            setShowPlaceDetailInfoWindow(false)
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

                {props.placeDetail && props.showPlaceDetail && showPlaceDetailInfoWindow ?
                    <InfoWindow position={props.placeDetail.geometry.location}>
                        <div>
                            <h3>{props.placeDetail.name}</h3>
                            <h3>{props.placeDetail.rating}</h3>
                        </div>
                    </InfoWindow>
                    : null}
            </GoogleMap>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        userLocation: state.authReducer.userLocation
    }
}
// export default FavMap;
export default connect(mapStateToProps)(FavMap)
