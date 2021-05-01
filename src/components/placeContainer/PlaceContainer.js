import React from 'react'
import './placeContainer.css'
import { connect } from 'react-redux'
import { AddToFavorites } from '../../stores/actions/favActionCreator'
import { getPlaceDetail, togglePlaceDetail, mouseEnter } from '../../stores/actions/searchActionCreator'

function PlaceContainer(props) {
    // console.log('props from placeContainer', props)

    const handleShowPlaceDetail = (id) => {
        props.togglePlaceDetail(true)
        props.getPlaceDetail(id)
        props.mouseEnter(null)
    }

    const businessStatus = (item) => {
        if (item.business_status === 'CLOSED_TEMPORARILY') { return 'Close Temporarily' }
        if (item.business_status === 'OPERATIONAL') {
            if (item.opening_hours.open_now) { return 'Open Now' }
            return 'Close'
        }
    }
    return (
        <div className='place-container'
        //  onMouseOut={() => props.mouseEnter(null)}  
         >
            <div
                onClick={() => handleShowPlaceDetail(props.place.place_id)}
                onMouseEnter={() => props.mouseEnter(props.place)} 
                // onMouseLeave={() => props.mouseEnter(null)}
            >
                <h2>{props.place.name}</h2>
                <p>Rating:{props.place.rating}</p>
                <p>Total Ratings:{props.place.user_ratings_total}</p>
                <p>Price:{props.place.price_level}</p>
                <p>{props.place.vicinity}, {props.place.plus_code.compound_code}</p>
                <p>{businessStatus(props.place)}</p>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        favPlaces: state.favReducer,
    }
}

export default connect(mapStateToProps, { AddToFavorites, getPlaceDetail, togglePlaceDetail, mouseEnter })(PlaceContainer)


