import React, { useState, useEffect, } from 'react'
import './directions.css'
import { useHistory, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import DirectionsMap from '../map/DirectionsMap.js'
import TopNav from '../topNav/TopNav.js'
import CopyMap from '../map/CopyMap';
import HardCodeMap from '../map/HardCodeMap';

function Directions(props) {
    // console.log('props in Direction', props)
    const history = useHistory()

    return (
        <div>
            <div className='topNav-wrapper'>
                <button onClick={() => history.push('/home')}>Go Back</button>
                <TopNav />
            </div>

            {/* //============================================================================================================
            // Map
            //============================================================================================================ */}

            <div className='map-wrapper'>
                <HardCodeMap />
            </div>


        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        favList: state.favReducer.favList,
        placeDetail: state.searchReducer.placeDetail
    }
}

export default connect(mapStateToProps)(Directions)



//
 //============================================================================================================
            // Side Bar
            //============================================================================================================
//  <div className='directions-wrapper'>
//                 <span>Car</span>
//                 <span>Walk</span>
//                 <span>Bike</span>
//                 <span>Bus</span>
//                 <br />
//                 <form>
//                     <input></input>
//                     <br />
//                     <input></input>
//                     <br />
//                     <button>{'Go ->'}</button>
//                 </form>
//             </div> */}