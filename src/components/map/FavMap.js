
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


function FavMap(props) {

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
    <div className="FavMap">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        onClick={onMapCLick}
      >
         {props.places.map((item) =>
                    <Marker
                        // icon={props.showPlaceDetail ? 'favicon.ico' : null }
                        key={item.place_id}
                        position={{
                            lat: item.geometry.location.lat,
                            lng: item.geometry.location.lng
                        }}
                        onClick={() => {
                            setSelected(item)
                            // setShowUserAddress(false)
                        }}
                    />
                )}

                {selected ?
                    <InfoWindow
                        onCloseClick={() => { setSelected(null) }}
                        position={selected.geometry.location}
                    >
                        <div>
                            <h3>{selected.name}</h3>
                            <h3>{selected.rating}</h3>
                        </div>
                    </InfoWindow> : null}
      </GoogleMap>
    </div>
  );
}

export default FavMap;
