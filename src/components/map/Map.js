import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import './map.css'
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Marker,
    InfoWindow
} from "react-google-maps";
// import * as sushiPlaces from "../../data/sushiPlaces.json";

const Map = (props) => {
    // console.log('big map props', props.places.length)
    let [userLocation, setUserLocation] = useState(null)
    let [selectedMarker, setSelectedMarker] = useState(null)
    const key = 'AIzaSyALhFgmCW6bVy6JdBOF_ccNtu1NgrfRxiw'


    useEffect(async () => {
        let response = await axios.get('https://geolocation-db.com/json/f9902210-97f0-11eb-a459-b997d30983f1')
        setUserLocation({ lat: response.data.latitude, lng: response.data.longitude })
    }, [])


    const onMarkerClick = useCallback((item)=>{
        setSelectedMarker({
            lat: item.geometry.location.lat,
            lng: item.geometry.location.lng
        })
    }, [])

    function MapContent() {
        return (
            <>
                {props.place === null ? null :
                    <div>
/******************************************************************************************************************************
*                      IF ONLY 1 LOCATION FOUND, DEFAULTCENTER = THAT'S LOCATION, DEFAULTZOOM = 15.                   
*                       ELSE DEFAULTLOCATION = USER'S LOCATION, DEFAULTZOOM = 13                               
******************************************************************************************************************************/

                        <GoogleMap
                            defaultZoom={props.places.length === 1 ? 15 : 13}
                            defaultCenter={
                                props.places.length === 1
                                    ? { lat: props.places[0].geometry.location.lat, lng: props.places[0].geometry.location.lng }
                                    : userLocation
                                // : { lat: 40.7834345, lng: -73.9662495 }
                            }>

/******************************************************************************************************************************
*                     USER LOCATION 
******************************************************************************************************************************/
                        
                        <Marker position={userLocation} />
                        
/******************************************************************************************************************************
*                     LOOP THROUGH SEARCH RESULT AND PUT MARKER INTO MAP USING RESULTS LOCATION
******************************************************************************************************************************/
                           
                            {/* {props.places.map(item => (
                                <Marker
                                    key={item.place_id}
                                    // onMouseOver={() => setSelectedMarker(item)}
                                    onClick={() => setSelectedMarker(item)}
                                    position={{
                                        lat: item.geometry.location.lat,
                                        lng: item.geometry.location.lng
                                    }}
                                /> */}

                            {props.places.map(item => (
                                <Marker
                                    key={item.place_id}
                                    // onMouseOver={() => setSelectedMarker(item)}
                                    // onClick={() => setSelectedMarker(item)}
                                    onClick={() => onMarkerClick(item)}
                                    position={{
                                        lat: item.geometry.location.lat,
                                        lng: item.geometry.location.lng
                                    }}
                                />   
                            ))}

                            {/* //====================================================================================================================
            //  if a marker is hovered, show InfoWindow of that marker
            //==================================================================================================================== */}

                            {/* {selectedMarker ?
                                (<InfoWindow
                                    onCloseClick={() => setSelectedMarker(null)}
                                    position={{
                                        lat: selectedMarker.geometry.location.lat,
                                        lng: selectedMarker.geometry.location.lng
                                    }}
                                >
                                    <div>
                                        <p>{selectedMarker.name}</p>
                                        <p>{selectedMarker.rating}</p>
                                    </div>
                                </InfoWindow>) : null}  */}

                            {selectedMarker &&
                                (<InfoWindow
                                    onCloseClick={() => setSelectedMarker(null)}
                                    position={{
                                        lat: selectedMarker.geometry.location.lat,
                                        lng: selectedMarker.geometry.location.lng
                                    }}
                                >
                                    <div>
                                        <p>{selectedMarker.name}</p>
                                        <p>{selectedMarker.rating}</p>
                                    </div>
                                </InfoWindow>)} 
                        </GoogleMap >
                    </div>
                }

            </>
        );
    }

    const MapScript = withScriptjs(withGoogleMap(MapContent));


    // function MapWrapper() {
        return (
            <div className='map-wrapper' style={{ top: 0, width: "100vw", height: "100vh" }}>
                <MapScript
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}&v=3.exp&libraries=geometry,drawing,places`}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100%` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
        );
    // }

    // return MapWrapper

}

export default Map