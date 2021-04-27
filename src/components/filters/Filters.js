import React from 'react'
import './filter.css'
import { connect } from "react-redux";
import { getfilterList } from '../../stores/actions/searchActionCreator'

function Filters(props) {

    return (
        <div className='filters-wrapper'>
            <select
                onChange={(event) => props.getfilterList(props.placesWithNoFilter, event.target.value, null)}
                id="rating">
                <option value='none' defaultValue hidden>Rating</option>
                <option value="">Any Rating</option>
                <option value="2">2 stars</option>
                <option value="3">3 stars</option>
                <option value="4">4 stars</option>
                <option value="5">5 stars</option>
            </select>

            <select
                onChange={(event) => props.getfilterList(props.placesWithNoFilter, null, event.target.value)}
                id="price">
                <option value='none' defaultValue hidden>Price</option>
                <option value=''>All Price</option>
                <option value="1">$</option>
                <option value="2">$$</option>
                <option value="3">$$$</option>
                <option value="4">$$$$</option>
            </select>

            <select id="open-hour">
                <option value='none' defaultValue hidden>Open Hour</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        placesWithNoFilter: state.searchReducer.placesWithNoFilter
    }
}

export default connect(mapStateToProps, { getfilterList })(Filters)
