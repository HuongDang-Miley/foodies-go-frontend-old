import React, { Component } from 'react'
// import './UdaciMap.css'

import axios from 'axios'

class UdaciMap extends Component {
    
    state = {
        venues: []
        
  }

  componentDidMount() {
    this.getVenues()
  }
  

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyD1DrDBUd6GNL2EIBCxK-K0OjkTny8kbuA&callback=initMap")
    window.initMap = this.initMap
  }

  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "PMHC2WA1VCBHVYOPPSJ0QSBYTLRF4PNJ04OWVWV0PZJ0QFIR",
      client_secret: "CULSZZ44YAEBOWBFGPB4BF5ISRXXSNYR0EE3JV3CNE2ZWHV0",
      query: "food",
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

    // Create An InfoWindow
    var infowindow = new window.google.maps.InfoWindow()

    // Display Dynamic Markers
    this.state.venues.map(myVenue => {

      var contentString = `${myVenue.venue.name}`

      // Create A Marker
      var marker = new window.google.maps.Marker({
        position: {lat: myVenue.venue.location.lat , lng: myVenue.venue.location.lng},
        map: map,
        title: myVenue.venue.name
      })

      // Click on A Marker!
      marker.addListener('click', function() {

        // Change the content
        infowindow.setContent(contentString)

        // Open An InfoWindow
        infowindow.open(map, marker)
      })

    })

    

  }

  render() {
      console.log('this.props', this.props)
    return (
      <main>
        <div id="map" style={{height: '100vh'}}></div>
      </main>
    )
  }
}

function loadScript(url) {
  var index  = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

export default UdaciMap;