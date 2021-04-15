import React from "react";
import './home.css'
import MapWrapper from './components/map/Map.js'
import Map2 from './components/map/Map2.js'
import Search from './components/search/Search.js'
import Sidebar from './components/sidebar/Sidebar.js'
import { connect } from "react-redux";
import { nearbySearch, test, placeDetail , togglePlaceDetail} from './stores/actions/searchActionCreator'

function Home(props) {
    console.log('props in Home', props)
    return (
        <div>
            <div className='topNav-wrapper'>
                <Search
                    state={props.state}
                    nearbySearch={props.nearbySearch}
                    togglePlaceDetail={props.togglePlaceDetail}
                // getVenues={props.getVenues}
                />
            </div>

            <div className='map-wrapper'>
                {/* <MapWrapper
                    state={props.state}
                    nearbySearch={props.nearbySearch}
                /> */}
                <Map2
                    state={props.state}
                    nearbySearch={props.nearbySearch}
                />
            </div>
            {props.state.places.length === 0
                ? null
                : <div className='sidebar-wrapper'>
                    <Sidebar
                        togglePlaceDetail={props.togglePlaceDetail}
                        placeDetail={props.placeDetail}
                        state={props.state} />
                </div>
            }
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        state
    }
}

export default connect(mapStateToProps, { test, nearbySearch, placeDetail , togglePlaceDetail})(Home)
