import React from "react";
import './home.css'
import MapWrapper from './components/map/Map.js'
import Map2 from './components/map/Map2.js'
import Search from './components/search/Search.js'
import Sidebar from './components/sidebar/Sidebar.js'
import Favorites from './components/favorites/Favorites.js'
import { connect } from "react-redux";
import { getNearbySearch, test, getPlaceDetail , togglePlaceDetail} from './stores/actions/searchActionCreator'
// import searchReducer from "./stores/reducers/searchReducer";

function Home(props) {
    console.log('props in Home', props)
    return (
        <div>
            <div className='topNav-wrapper'>
                <Search
                    searchResults={props.searchResults}
                    getNearbySearch={props.getNearbySearch}
                    togglePlaceDetail={props.togglePlaceDetail}
                />
            </div>

            <div className='map-wrapper'>
                {/* <MapWrapper
                    state={props.searchResults}
                    getNearbySearch={props.getNearbySearch}
                /> */}
                <Map2
                    searchResults={props.searchResults}
                    getNearbySearch={props.getNearbySearch}
                />
            </div>
            {props.searchResults.places.length === 0
                ? null
                : <div className='sidebar-wrapper'>
                    <Sidebar
                        togglePlaceDetail={props.togglePlaceDetail}
                        getPlaceDetail={props.getPlaceDetail}
                        searchResults={props.searchResults} />
                </div>
            }
            {/* <div>
            <Favorites/>
            </div> */}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        searchResults: state.searchReducer,
        isAuth: state.authrReducer
    }
}

export default connect(mapStateToProps, { test, getNearbySearch, getPlaceDetail , togglePlaceDetail})(Home)
