import React from "react";
import './home.css'
import { connect } from "react-redux";
import FavMap from './components/map/FavMap.js'
import HomeMap from './components/map/HomeMap.js'
import TopNav from './components/topNav/TopNav.js'
import Sidebar from './components/sidebar/Sidebar.js'
// import Filters from './components/filters/Filters'
import PlaceDetail from './components/placeDetail/PlaceDetail'
import { togglePlaceDetail } from './stores/actions/searchActionCreator'

function Home(props) {



    // console.log('props in Home', props)

    return (
        <div>
            <div className='topNav-wrapper'>
                <TopNav />

            </div>

            <div className='map-wrapper'>
                <HomeMap />
            </div>
            /******************************************************************************************************************************
            *       In sidebar, if showPlaceDetail = false, show sidebar else show placeDetail
            ******************************************************************************************************************************/

            <div className='sidebar-wrapper'>
                {props.showPlaceDetail
                    ? <div className='placeDetail-wrapper'>
                        <button onClick={() => props.togglePlaceDetail(false)}>{`<- Back`}</button>
                        <PlaceDetail />
                    </div>
                    : <Sidebar />
                }
            </div>

            {/* {props.places.length === 0
                ? null
                : <div className='sidebar-wrapper'>
                    <Sidebar />
                </div>
            } */}


        </div>
    );
}


const mapStateToProps = (state) => {
    return {
        places: state.searchReducer.places,
        showPlaceDetail: state.searchReducer.showPlaceDetail,
    }
}

export default connect(mapStateToProps, { togglePlaceDetail })(Home)
