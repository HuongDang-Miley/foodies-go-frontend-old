import React, { Component } from 'react'
// import './MapJs.css'

import axios from 'axios'

class MapJs extends Component {


  state = {
    venues: []
  }

  componentDidMount() {
    this.getVenues()
  }

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyALhFgmCW6bVy6JdBOF_ccNtu1NgrfRxiw&callback=initMap")
    window.initMap = this.initMap
  }

  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "PMHC2WA1VCBHVYOPPSJ0QSBYTLRF4PNJ04OWVWV0PZJ0QFIR",
      client_secret: "CULSZZ44YAEBOWBFGPB4BF5ISRXXSNYR0EE3JV3CNE2ZWHV0",
      query: "stake",
      near: "manhattan",
      v: "20182507"
    }

    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState({
          venues: response.data.response.groups[0].items
        }, this.renderMap())
      })
      .catch(error => {
        console.log("ERROR!! " + error)
      })

  }

  initMap = () => {

    // Create A Map
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 40.7834345, lng: -73.9662495 },
      zoom: 13
    })

     // Create A Marker
     var marker = new window.google.maps.Marker({
      position: { lat: 40.7834345, lng: -73.9662495 },
      map: map,
      // title: myVenue.venue.name
    })

    //create a DirectionsService object to use the route method and get a result for our request
    const directionsService = new window.google.maps.DirectionsService();
      
    
    //create a DirectionsRenderer object which we will use to display the route
    const directionsRenderer = new window.google.maps.DirectionsRenderer();

    //bind the DirectionsRenderer to the map
    directionsRenderer.setMap(map);

    // function calculateAndDisplayRoute(directionsService, directionsRenderer) {
      directionsService.route(
        {
          origin: { lat: 40.7681, lng: -74.0208 },
          destination: { lat: 40.7386556, lng: -74.02963889999999 },
          travelMode: 'DRIVING',
        },
        (response, status) => {
          if (status === "OK") {
            directionsRenderer.setDirections(response);
          } else {
            window.alert("Directions request failed due to " + status);
          }
        }
      );
    // }



  }

  render() {
    return (
      <main>
        <div id="map" style={{height: '100vh'}}></div>
        <div id='inputs'>
          <input />
          <input />
          <button>Get Directions</button>
        </div>
        <div id="output">

        </div>
      </main>
    )
  }
}

function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

export default MapJs;
