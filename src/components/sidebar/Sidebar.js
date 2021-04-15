import React from 'react'
import PlaceContainer from '../placeContainer/PlaceContainer'
import './sidebar.css'

export default function Sidebar(props) {
    console.log('props in sidebar', props)
    return (
        <>
            {props.state.places.map(place =>
                <PlaceContainer key={place.place_id} place={place} />
            )}
        </>
    )
}
