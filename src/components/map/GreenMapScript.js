
import MapWrapped from './GreenMap.js'
console.log('MapWrapped', MapWrapped)

export default function GreenMapWrapper() {
    const key = 'AIzaSyALhFgmCW6bVy6JdBOF_ccNtu1NgrfRxiw'
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
  