import React from 'react'
import './placeContainer.css'
import { connect } from 'react-redux'
import { AddToFavorites } from '../../stores/actions/favActionCreator'
import { getPlaceDetail, togglePlaceDetail } from '../../stores/actions/searchActionCreator'

// export default function PlaceContainer(props) {
function PlaceContainer(props) {
    // console.log('props from placeContainer', props)

    //=========================== Check if there is a token ===========================

    // let [userId, setUserId] = useState('')

    // useEffect(() => {
    //     let userToken = localStorage.getItem('userToken')
    //     if (userToken) {
    //         let decoded = jwtDecode(userToken)
    //         setUserId(decoded.id)
    //     }
    // })

    const handleShowPlaceDetail = (id) => {
        props.togglePlaceDetail(true)
        props.getPlaceDetail(id)
    }

    // const handleAddToFavorites = () => {
    //     userId === '' 
    //     ? console.log('Please Sign In')
    //     : props.AddToFavorites(userId, props.place)
    // }

    return (
        <div className='place-container'>
            {/* <button className='save-btn'
                onClick={() => handleAddToFavorites(props.place)}
                // onClick={() => props.AddToFavorites(props.place)}
            >Add To Favorite</button> */}
            <div
                onClick={() => handleShowPlaceDetail(props.place.place_id)}
                onMouseEnter={() => console.log('mouse enter')}
            >
                <h2>{props.place.name}</h2>
                <p>Rating:{props.place.rating}</p>
                <p>Total Ratings:{props.place.user_ratings_total}</p>
                <p>Price:{props.place.price_level}</p>
                <p>{props.place.vicinity}, {props.place.plus_code.compound_code}</p>
                {/* {props.place.opening_hours.open_now ? <p>Open Now</p> : null} */}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        favPlaces: state.favReducer,
    }
}

export default connect(mapStateToProps, { AddToFavorites,getPlaceDetail, togglePlaceDetail })(PlaceContainer)


