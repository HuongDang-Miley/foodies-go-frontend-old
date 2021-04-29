import React, { useEffect } from 'react'

let startLocation = null
let endLocation = null
let travelMode = 'DRIVING'


const RoutesMap = (props) => {
    // console.log('props in RoutesMap', props)

    useEffect(() => {
        if (props.placeDetail && props.userLocation) {
            console.log('run inside effect')
            startLocation = { lat: props.userLocation.latitude, lng: props.userLocation.longitude }
            endLocation = (props.placeDetail.geometry.location)
            renderMap()
        }
    }, [props.placeDetail, props.userLocation])

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

        if (props.placeDetail && props.userLocation) {
            // console.log('startLocation', {lat: props.userLocation.latitude, lng: props.userLocation.longitude}, 'endLocation', props.placeDetail.geometry.location)
            console.log('run inside init map startLocation', startLocation, 'endLocation', endLocation)

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
                    } else {
                        window.alert("Directions request failed due to " + status);
                    }
                }
            )
        }
    }


    return (
        <div id="map" style={{ height: '100vh' }}></div>
    )

}

export default RoutesMap;

function loadScript(url) {
    var index = window.document.getElementsByTagName("script")[0]
    var script = window.document.createElement("script")
    script.src = url
    script.async = true
    script.defer = true
    index.parentNode.insertBefore(script, index)
}


