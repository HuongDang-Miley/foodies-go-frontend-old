
import React, { useState, useCallback, useEffect } from 'react'
import { connect } from "react-redux";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { getNearbySearch, getPlaceDetail, togglePlaceDetail } from '../../stores/actions/searchActionCreator'
import { getUserLocation } from '../../stores/actions/authActionCreator'


const libraries = ['places']
const mapContainerStyle = {
    width: '100vw',
    height: '100vh'
}

const center = {
    lat: 40.7834345,
    lng: -73.9662495
}


function FavMap(props) {
    // console.log('placeDetail location in FavMap', props.placeDetail.geometry.location)

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
        // console.log('props.userLocation in useEffect', props.userLocation)
    }, [props.userLocation])


    const onMapCLick = useCallback((event) => {
        setMaker({
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        })
    }, [])


    const handleShowInfoWindow = (id) => {
        props.togglePlaceDetail(true)
        props.getPlaceDetail(id)
    }

    const changeMarkerIcon = (item) => {
        if (props.hoveredPlace && item.place_id === props.hoveredPlace.place_id) { return 'favicon.ico' }
        if (props.showPlaceDetail && props.placeDetail && item.place_id === props.placeDetail.place_id) { return 'favicon.ico' }
        return null
    }

    if (loadError) return 'Error Loading Map'
    if (!isLoaded) return 'Loading Maps'

    return (
        <div className="FavMap">
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={13}
                center={centerLocation}
                // center={center}
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
                        icon={changeMarkerIcon(item)}
                        // icon={item.geometry.location === props.hoveredPlace ? 'favicon.ico' : null}
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
                        <div onClick={() => handleShowInfoWindow(selected.place_id)}>
                            <h3>{selected.name}</h3>
                            <h3>{selected.rating}</h3>
                            <h3>{selected.vicinity}</h3>
                        </div>
                    </InfoWindow> : null}

                {/* {props.placeDetail && props.showPlaceDetail && showPlaceDetailInfoWindow ?
                    <InfoWindow position={props.placeDetail.geometry.location}>
                        <div>
                            <h3>{props.placeDetail.name}</h3>
                            <h3>{props.placeDetail.rating}</h3>
                        </div>
                    </InfoWindow>
                    : null} */}
            </GoogleMap>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        places: state.searchReducer.places,
        showPlaceDetail: state.searchReducer.showPlaceDetail,
        placeDetail: state.searchReducer.placeDetail,
        hoveredPlace: state.searchReducer.hoveredPlace,
        userLocation: state.authReducer.userLocation,
    }
}
export default connect(mapStateToProps, { getNearbySearch, getPlaceDetail, togglePlaceDetail, getUserLocation })(FavMap)
// export default FavMap;

