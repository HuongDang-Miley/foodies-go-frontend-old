
import React, { useState, useCallback, useEffect } from 'react'
import { connect } from "react-redux";
import { GoogleMap, useLoadScript, Marker, InfoWindow, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';
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
    // console.log('props location in FavMap', props)

    /******************************************************************************************************************************
    *                   Declare vairable
    ******************************************************************************************************************************/



    // const [center, setCenter] = useState(null)
    // const [marker, setMaker] = useState(null)
    let [directions, setDirections] = useState("");
    const [selected, setSelected] = useState(null)
    const [userAddress, setUserAddress] = useState(null)
    const [showPlaceDetailInfoWindow, setShowPlaceDetailInfoWindow] = useState(true)
    const [centerLocation, setCenterLocation] = useState({
        lat: 40.7834345,
        lng: -73.9662495
    })

    /******************************************************************************************************************************
    *                    Functions
    ******************************************************************************************************************************/
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyALhFgmCW6bVy6JdBOF_ccNtu1NgrfRxiw',
        libraries,
    });

    useEffect(() => {
        if (props.userLocation) {
            setCenterLocation({ lat: props.userLocation.latitude, lng: props.userLocation.longitude })
        }
    }, [props.userLocation])


    const directionsCallback = (response) => {
        console.log(response)
        if (response !== null) {
            if (response.status === 'OK') {
                setDirections(response)
            } else {
                console.log('response: ', response)
            }
        }
    }

    // const onMapCLick = useCallback((event) => {
    //     const newLocation = `${event.latLng.lat()},${event.latLng.lng()}`
    //     let keyword = getKeyword()
    //     // setCenterLocation({lat: event.latLng.lat(), lng: event.latLng.lng()})
    //     // props.getNearbySearch(props.keyword, newLocation)
    //     console.log('newLocation', newLocation)
    //     console.log('keyword', keyword)
    //     // console.log('props.places', props.places)
    // }, [])

    const clickMap = (event) => {
        const newLocation = `${event.latLng.lat()},${event.latLng.lng()}`
        props.getNearbySearch(props.keyword, newLocation)
        // console.log('newLocation', newLocation)
        // console.log('props.keyword', props.keyword)
    }


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

    /******************************************************************************************************************************
    *                     Return Map
    ******************************************************************************************************************************/
    return (
        <div className="FavMap">
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={13}
                center={centerLocation}
                // center={center}
                // onClick={onMapCLick}
                onClick={clickMap}
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
*                     Show PlaceDetail marker and InfoWindow if clicked
******************************************************************************************************************************/

                {props.places.map((item) =>
                    <Marker
                        key={item.place_id}
                        icon={changeMarkerIcon(item)}
                        position={{
                            lat: item.geometry.location.lat,
                            lng: item.geometry.location.lng
                        }}
                        onClick={() => {
                            setSelected(item)
                            setUserAddress(false)
                            // setShowPlaceDetailInfoWindow(false)
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

/******************************************************************************************************************************
*                     Show Direction
******************************************************************************************************************************/

                <DirectionsService
                    options={{
                        // origin: { centerLocation },
                        // destination: { lat: 40.7386556, lng: -74.02963889999999 },
                        // origin: { lat: 40.7681, lng: -74.0208 },
                        // travelMode: 'DRIVING'
                    }}
                    callback={directionsCallback}
                />
                {directions ? <DirectionsRenderer options={{ directions }} /> : null}

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
        keyword: state.searchReducer.keyword,
        userLatLng: state.authReducer.userLatLng
    }
}
export default connect(mapStateToProps, { getNearbySearch, getPlaceDetail, togglePlaceDetail, getUserLocation })(FavMap)

// SAVE CODE
// export default FavMap;

/* {props.placeDetail && props.showPlaceDetail && showPlaceDetailInfoWindow ?
                    <InfoWindow position={props.placeDetail.geometry.location}>
                        <div>
                            <h3>{props.placeDetail.name}</h3>
                            <h3>{props.placeDetail.rating}</h3>
                        </div>
                    </InfoWindow>
                    : null} */