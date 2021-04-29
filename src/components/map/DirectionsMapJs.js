import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import { getNearbySearch, getPlaceDetail, togglePlaceDetail } from '../../stores/actions/searchActionCreator'
import { getUserLocation } from '../../stores/actions/authActionCreator'
import { getVenues } from '../../stores/actions/mapActionCreator'

const DirectionsMapJs = (props) => {

    console.log('props in before UseEffect', props)

    useEffect(() => {
        props.getVenues()
        if (props.venues) {
            renderMap()
        }
    }, [])

    console.log('props after UseEffect', props)


    const renderMap = () => {
        loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyD1DrDBUd6GNL2EIBCxK-K0OjkTny8kbuA&callback=initMap")
        window.initMap = initMap
    }


    const initMap = () => {

        // Create A Map
        var map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: 40.7681, lng: -74.0208 },
            zoom: 13
        })

        // Create An InfoWindow
        var infowindow = new window.google.maps.InfoWindow()

        // Display Dynamic Markers
        console.log('props.venue', props.venue)
        if (props.venues.length !== 0) {
            props.venues.map(myVenue => {
                var contentString = `${myVenue.venue.name}`

                // Create A Marker
                var marker = new window.google.maps.Marker({
                    position: { lat: myVenue.venue.location.lat, lng: myVenue.venue.location.lng },
                    map: map,
                    title: myVenue.venue.name
                })
                // Click on A Marker!
                marker.addListener('click', function () {

                    // Change the content
                    infowindow.setContent(contentString)

                    // Open An InfoWindow
                    infowindow.open(map, marker)
                })

            })
        }


    }


    return (
        <main>
            <div id="map" style={{ height: '100vh' }}></div>
        </main>
    )

}

function loadScript(url) {
    var index = window.document.getElementsByTagName("script")[0]
    var script = window.document.createElement("script")
    script.src = url
    script.async = true
    script.defer = true
    index.parentNode.insertBefore(script, index)
}

// export default DirectionsMapJs;

const mapStateToProps = (state) => {
    return {
        places: state.searchReducer.places,
        venues: state.mapReducer.venues,
    }
}
export default connect(mapStateToProps, { getNearbySearch, getPlaceDetail, togglePlaceDetail, getUserLocation, getVenues })(DirectionsMapJs)