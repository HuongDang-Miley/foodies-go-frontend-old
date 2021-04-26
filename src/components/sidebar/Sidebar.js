import React from 'react'
import PlaceContainer from '../placeContainer/PlaceContainer'
import PlaceDetail from '../placeDetail/PlaceDetail'
import './sidebar.css'

export default function Sidebar(props) {
    // console.log('props in sidebar', props)

    // const handleShowPlaceDetail = (id) => {
    //     props.togglePlaceDetail(true)
    //     props.getPlaceDetail(id)
    // }

    return (
        <>
            {props.showPlaceDetail ?
                <PlaceDetail
                    placeDetail={props.placeDetail}
                    // placeDetail={props.searchResults.placeDetail}
                    togglePlaceDetail={props.togglePlaceDetail}
                />
                : <>
                    <div className='filter-bar'>{props.places.length} Results</div>
                    {props.places.map(place =>
                        <div
                        // onClick={() => handleShowPlaceDetail(place.place_id)}
                        // onMouseEnter={() => console.log('mouse enter')}
                        >
                            <PlaceContainer
                                togglePlaceDetail={props.togglePlaceDetail}
                                getPlaceDetail={props.getPlaceDetail}
                                key={place.place_id}
                                place={place} />
                        </div>
                    )}
                </>}
        </>
    )
}
