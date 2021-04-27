import React, { useState } from 'react'
import './sidebar.css'
import { connect } from "react-redux";
import PlaceContainer from '../placeContainer/PlaceContainer'
import Filters from '../filters/Filters'
import { getfilterList, mouseEnter } from '../../stores/actions/searchActionCreator'


function Sidebar(props) {
    // console.log('props in sidebar', props)

    return (
        <>
            <div className='filters-bar'>
                <p className='result-text'>{props.places.length} Results</p>
                <div className='filters'><Filters /></div>
            </div>
            {props.places.length === 0
                ? null
                : <div className='placelist-wrapper'  onMouseLeave={() => props.mouseEnter(null)}  >
                    {props.places.map(item => <PlaceContainer place={item} key={item.place_id} />)}
                </div>
            }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        places: state.searchReducer.places,
        // showPlaceDetail: state.searchReducer.showPlaceDetail,
    }
}

export default connect(mapStateToProps, { getfilterList, mouseEnter })(Sidebar)
