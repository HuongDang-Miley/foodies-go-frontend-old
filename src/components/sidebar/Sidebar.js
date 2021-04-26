import React from 'react'
import PlaceContainer from '../placeContainer/PlaceContainer'
import PlaceDetail from '../placeDetail/PlaceDetail'
import './sidebar.css'
import { connect } from "react-redux";

function Sidebar(props) {
    // console.log('props in sidebar', props)

    return (
        <>
            {props.showPlaceDetail
                ? <PlaceDetail />
                : <>
                    <div className='filter-bar'>{props.places.length} Results</div>
                    {props.places.map(place =>
                        <div key={place.place_id}>
                            <PlaceContainer place={place} />
                        </div>
                    )}
                </>}
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        places: state.searchReducer.places,
        showPlaceDetail: state.searchReducer.showPlaceDetail,
    }
}

export default connect(mapStateToProps)(Sidebar)
