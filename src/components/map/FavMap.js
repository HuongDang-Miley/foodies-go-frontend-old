
import React, { useState, useCallback } from 'react'
import { GoogleMap, useLoadScript, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';


const libraries = ['places']
const mapContainerStyle = {
  width: '100vw',
  height: '100vh'
}

const center = {
    lat: 40.7834345,
    lng: -73.9662495
}


function App() {

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyALhFgmCW6bVy6JdBOF_ccNtu1NgrfRxiw',
    libraries,
  });

  const [marker, setMaker] = useState(null)
  const [selected, setSelected] = useState(null)

  const onMapCLick = useCallback((event) => {
    setMaker({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    })
  }, [])

  if (loadError) return 'Error Loading Map'
  if (!isLoaded) return 'Loading Maps'

  return (
    <div className="App">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        onClick={onMapCLick}
      >
        <Marker
          position={marker}
          onClick={() => { setSelected(marker) }} />
        {selected ?
          <InfoWindow 
          onCloseClick={()=> setSelected(null)}
          position={marker}>
            <div>
            This is the window
            </div>
            </InfoWindow> : null}

      </GoogleMap>
    </div>
  );
}

export default App;
