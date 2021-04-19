import React, { useState } from 'react'
import './map.css'
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Marker,
    InfoWindow
} from "react-google-maps";
import * as sushiPlaces from "../../data/sushiPlaces.json";

function Map() {
    let [selectedMarker, setSelectedMarker] = useState(null)

    return (
        <GoogleMap
            defaultZoom={13}
            defaultCenter={{
                lat: 40.7834345,
                lng: -73.9662495
            }}
        >
            {/* ==================== Loop through search result and put marker into map using results location ==================== */}
            {sushiPlaces.results.map(item => (
                <Marker
                    key={item.place_id}
                    position={{
                        lat: item.geometry.location.lat,
                        lng: item.geometry.location.lng
                    }}
                    onClick={() => setSelectedMarker(item)}
                />
            ))
            }
            {/* ==================== if a marker is selected, show InfoWindow ==================== */}
            {selectedMarker ?
                (<InfoWindow
                    position={{
                        lat: selectedMarker.geometry.location.lat,
                        lng: selectedMarker.geometry.location.lng
                    }}
                    onCloseClick={() => setSelectedMarker(null)}
                >
                    <p>{selectedMarker.name}</p>
                </InfoWindow>) : null}
        </GoogleMap >
    );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));


export default function MapWrapper(props) {
    
    // console.log('props in mapWarrper', props)
    const key = 'AIzaSyALhFgmCW6bVy6JdBOF_ccNtu1NgrfRxiw'
    return (

        <div className='map-wrapper' style={{top: 0, width: "100vw", height: "100vh" }}>
            <MapWrapped
                // googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${key}`}
                googleMapURL={`"https://maps.googleapis.com/maps/api/js?key=${key}&v=3.exp&libraries=geometry,drawing,places",`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    );
}



// https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.67,-73.95&radius=1500&type=sushi&keyword=burger&key=AIzaSyALhFgmCW6bVy6JdBOF_ccNtu1NgrfRxiw