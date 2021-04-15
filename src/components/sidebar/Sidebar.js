import React from 'react'
import PlaceContainer from '../placeContainer/PlaceContainer'
import PlaceDetail from '../placeDetail/PlaceDetail'
import './sidebar.css'

export default function Sidebar(props) {
    console.log('props in sidebar', props.state.places.length)


    const handleShowPlaceDetail = (id) => {
        props.togglePlaceDetail(true)
        props.placeDetail(id)
    }

    return (
        <>
            {props.state.showPlaceDetail ?
                <PlaceDetail
                    placeDetail={props.state.placeDetail}
                    togglePlaceDetail={props.togglePlaceDetail}
                />
                : <>
                    <div className='filter-bar'>{props.state.places.length} Results</div>
                    {props.state.places.map(place =>
                        <div 
                        onClick={() => handleShowPlaceDetail(place.place_id)}
                        onMouseEnter={()=>console.log('mouse enter')}
                        >
                            <PlaceContainer
                                key={place.place_id} place={place} />
                        </div>
                    )}
                </>}
        </>
    )
}
