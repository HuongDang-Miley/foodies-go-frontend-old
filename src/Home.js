import React from "react";
import './home.css'
import { connect } from "react-redux";
import FavMap from './components/map/FavMap.js'
import TopNav from './components/topNav/TopNav.js'
import Sidebar from './components/sidebar/Sidebar.js'


function Home(props) {

    // console.log('props in Home', props)

    return (
        <div>
            <div className='topNav-wrapper'>
                <TopNav />
            </div>

            <div className='map-wrapper'>
                <FavMap />
                {/* <Map2 
                places={props.places}
                placeDetail={props.placeDetail}
                showPlaceDetail={props.showPlaceDetail}
                 /> */}

                {/* {props.showPlaceDetail
                    ? <Map places={[props.placeDetail]} /> //=> place detail
                    : <Map places={props.places} /> //=> nearby search
                } */}
            </div>
            {props.places.length === 0
                ? null
                : <div className='sidebar-wrapper'>
                    <Sidebar />
                </div>
            }
        </div>
    );
}


const mapStateToProps = (state) => {
    return { places: state.searchReducer.places}
}

export default connect(mapStateToProps)(Home)
