import React, { useState, useEffect } from "react";
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Marker,
    InfoWindow
} from "react-google-maps";
import * as parkData from "../../data/skateboard-parks.json";
// import * as sushiPlaces from "../../data/sushiPlaces.json";
import { connect } from "react-redux";
import { getNearbySearch, getPlaceDetail, togglePlaceDetail } from '../../stores/actions/searchActionCreator'
import mapStyles from "./mapStyles";
import searchReducer from '../../stores/reducers/searchReducer'

function GreenMap(props) {
    console.log('props in GreenMap', searchReducer)
    const [selectedPark, setSelectedPark] = useState(null);

    useEffect(() => {
        // const listener = e => {
        //   if (e.key === "Escape") {
        //     setSelectedPark(null);
        //   }
        // };
        // window.addEventListener("keydown", listener);

        // return () => {
        //   window.removeEventListener("keydown", listener);
        // };
    }, []);

    return (
        <GoogleMap
            defaultZoom={10}
            defaultCenter={{ lat: 45.4211, lng: -75.6903 }}
            defaultOptions={{ styles: mapStyles }}
        >
            {parkData.features.map(park => (
                <Marker
                    key={park.properties.PARK_ID}
                    position={{
                        lat: park.geometry.coordinates[1],
                        lng: park.geometry.coordinates[0]
                    }}
                    onClick={() => {
                        setSelectedPark(park);
                    }}
                    icon={{
                        url: `/skateboarding.svg`,
                        scaledSize: new window.google.maps.Size(25, 25)
                    }}
                />
            ))}

            {selectedPark && (
                <InfoWindow
                    onCloseClick={() => {
                        setSelectedPark(null);
                    }}
                    position={{
                        lat: selectedPark.geometry.coordinates[1],
                        lng: selectedPark.geometry.coordinates[0]
                    }}
                >
                    <div>
                        <h2>{selectedPark.properties.NAME}</h2>
                        <p>{selectedPark.properties.DESCRIPTIO}</p>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
}
const mapStateToProps = (state) => {
    return {
        places: state.searchReducer.places,
        showPlaceDetail: state.searchReducer.showPlaceDetail,
        placeDetail: state.searchReducer.placeDetail,
        searchResults: state.searchReducer,
        isAuth: state.authrReducer,
        markers: state.mapReducer
    }
}
connect(mapStateToProps, { getNearbySearch, getPlaceDetail, togglePlaceDetail })(GreenMap)

const MapWrapped = withScriptjs(withGoogleMap(GreenMap));

const key = 'AIzaSyALhFgmCW6bVy6JdBOF_ccNtu1NgrfRxiw'


export default function GreenMapWrapper() {
    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <MapWrapped
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}&v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    );
}
