import React from "react";
import './home.css'
import { connect } from "react-redux";
import FavMap from './components/map/FavMap.js'
import HomeMap from './components/map/HomeMap.js'
import TopNav from './components/topNav/TopNav.js'
import Sidebar from './components/sidebar/Sidebar.js'
// import Filters from './components/filters/Filters'
import PlaceDetail from './components/placeDetail/PlaceDetail'

function Home(props) {


    
    // console.log('props in Home', props)

    return (
        <div>
            <div className='topNav-wrapper'>
                <TopNav />
                
            </div>

            <div className='map-wrapper'>
                <HomeMap/>
            </div>

            {/* {props.places.length === 0
                ? null
                : <div className='sidebar-wrapper'>
                    <Sidebar />
                </div>
            } */}

            <div className='sidebar-wrapper'>
                {props.showPlaceDetail
                    ? <div className='placeDetail-wrapper'><PlaceDetail /></div>
                    : <Sidebar />
                }
            </div>

        </div>
    );
}


const mapStateToProps = (state) => {
    return {
        places: state.searchReducer.places,
        showPlaceDetail: state.searchReducer.showPlaceDetail,
    }
}

export default connect(mapStateToProps)(Home)
