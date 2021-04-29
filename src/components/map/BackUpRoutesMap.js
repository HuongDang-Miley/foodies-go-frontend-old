import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getDistance, getDuration } from '../../stores/actions/mapActionCreator'

let startLocation = null
let endLocation = null
let travelMode = 'DRIVING'


const RoutesMap = (props) => {
    console.log('props in RoutesMap', props.travelMode)

    useEffect(() => {
        if (props.placeDetail && props.userLocation && props.travelMode) {
            console.log('run inside effect')
            startLocation = { lat: props.userLocation.latitude, lng: props.userLocation.longitude }
            endLocation = props.placeDetail.geometry.location
            travelMode = props.travelMode
            renderMap()
        }
    }, [props.placeDetail, props.userLocation, props.travelMode])

    console.log('run outside useEffect startLocation:', startLocation, 'endLocation:', endLocation, 'travelMode:', travelMode)

    // Render Map content
    const renderMap = () => {
        loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyALhFgmCW6bVy6JdBOF_ccNtu1NgrfRxiw&callback=initMap")
        window.initMap = initMap
    }

    // Map content
    const initMap = () => {
        // Create A Map
        var map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: 40.7834345, lng: -73.9662495 },
            zoom: 13
        })

        //create a DirectionsService object to use the route method and get a result for our request
        const directionsService = new window.google.maps.DirectionsService();

        //create a DirectionsRenderer object which we will use to display the route
        const directionsRenderer = new window.google.maps.DirectionsRenderer();

        //bind the DirectionsRenderer to the map
        directionsRenderer.setMap(map);

        // If ther is placeDetail and userLocation, create a route

        if (props.placeDetail && props.userLocation && props.travelMode) {
            // console.log('startLocation', {lat: props.userLocation.latitude, lng: props.userLocation.longitude}, 'endLocation', props.placeDetail.geometry.location)
            console.log('run inside init map startLocation', startLocation, 'endLocation', endLocation, 'travelMode:', travelMode)

            directionsService.route(
                {
                    origin: startLocation,
                    destination: endLocation,
                    // origin: {lat: props.userLocation.latitude, lng: props.userLocation.longitude},
                    // destination: props.placeDetail.geometry.location,
                    travelMode: travelMode,
                },
                (response, status) => {
                    if (status === "OK") {
                        directionsRenderer.setDirections(response);
                        // get distance from response to state
                        props.getDistance(response.routes[0].legs[0].distance.text)
                        // set duration from response to state
                        props.getDuration(response.routes[0].legs[0].duration.text)
                    } else {
                        // if startLocation notfound, throw alert
                        window.alert("Directions request failed due to " + status);
                        // reset routes to empty
                        directionsRenderer.setDirections({ routes: [] });
                        // reset map center to userLocation
                        map.setCenter({ lat: props.userLocation.latitude, lng: props.userLocation.longitude })
                    }
                }
            )
        }
    }


    return (
        <div>
            {/* <div id='setting' style={{ zindex: 5 }}>
                <input id='from' />
                <br />
                <input id='to' />
                <br />
            </div> */}
            <div id="map" style={{ height: '100vh' }}></div>
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
export default connect(mapStateToProps, { getDistance, getDuration })(RoutesMap)
// export default RoutesMap;

function loadScript(url) {
    var index = window.document.getElementsByTagName("script")[0]
    var script = window.document.createElement("script")
    script.src = url
    script.async = true
    script.defer = true
    index.parentNode.insertBefore(script, index)
}


