import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode'
import { connect } from 'react-redux'
import './placeDetail.css'
import { getNearbySearch, getPlaceDetail, togglePlaceDetail } from '../../stores/actions/searchActionCreator'
import { AddToFavorites, deletePlace } from '../../stores/actions/favActionCreator'


function PlaceDetail(props) {
    console.log('props in Place Detail', props)
    // ============================================================================================================
    // Set variable
    // ============================================================================================================

    let history = useHistory()
    let [userId, setUserId] = useState('')
    const [showAddToFavBtn, setShowAddToFavBtn] = useState(true)

    // ============================================================================================================
    // Check for userId. If there is userId, user can add place to Favorites, if not, page redirect to Login page 
    // ============================================================================================================

    useEffect(() => {
        let userToken = localStorage.getItem('userToken')
        if (userToken) {
            let decoded = jwtDecode(userToken)
            setUserId(decoded.id)
        }
    }, [])

    // ============================================================================================================
    // Functions
    // ============================================================================================================

    const priceLevel = (num) => {
        if (num === undefined) { return '$' }
        if (Number(num) === 1) { return '$' }
        if (Number(num) === 2) { return '$$' }
        if (Number(num) === 3) { return '$$$' }
        if (Number(num) === 4) { return '$$$$' }
    }

    const handleAddToFavorites = () => {
        userId === ''
            ? history.push('/login')
            : props.AddToFavorites(userId, props.placeDetail)
        setShowAddToFavBtn(false)
    }

    const handleDetelePlace = () => {
        props.deletePlace(props.favList, userId, props.placeDetail.place_id)
        setShowAddToFavBtn(true)
    }

    const [showOpenHour, setShowOpenHour] = useState(false)

    return (
        <>
            {/* ============================================================================================================
IF there is a placeDetail, show it
============================================================================================================ */}

            {props.placeDetail === null ? null :
                <div>
                    {/* ============================================================================================================
            Back and Add To Favorites Section
            ============================================================================================================ */}
                    <button onClick={() => props.togglePlaceDetail(false)}>{`<- Back`}</button>
                    {showAddToFavBtn
                        ? <button className='add-to-fav-btn' onClick={() => handleAddToFavorites()}>Add To Favorite</button>
                        : <button className='add-to-fav-btn' onClick={() => handleDetelePlace()}>Delete From Favorite</button>
                    }
                    <button onClick={()=> history.push('/directions')}>Get Directions</button>
                    {/* ============================================================================================================
            Place Detail section
            ============================================================================================================ */}


                    <h2>{props.placeDetail.name}</h2>
                    <p>{props.placeDetail.types[0]}</p>
                    <p>Rating: {props.placeDetail.rating}</p>
                    <p>{props.placeDetail.reviews.length} Reviews</p>
                    <p>Price: {priceLevel(props.placeDetail.price_level)} </p>
                    <p>Website: {props.placeDetail.website}</p>
                    <p>Address:{props.placeDetail.vicinity}</p>
                    <p>Phone: {props.placeDetail.formatted_phone_number}</p>
                    <p>{props.placeDetail.opening_hours.open_now ? 'Open Now' : 'Close'}
                        <span onClick={() => setShowOpenHour(true)}> Open Hours:  ▼ </span></p>
                    {showOpenHour ?
                        <div>{props.placeDetail.opening_hours.weekday_text.map(item => <p>{item}</p>)}</div>
                        : null}
                    <h3>Reviews</h3>

                    {/* ============================================================================================================
            User Reviews section
            ============================================================================================================ */}

                    {props.placeDetail.reviews.map(item =>
                        <div className='review-wrapper' key={item.author_name}>
                            <img className='user-review-img' src={item.profile_photo_url} />
                            <span>{item.author_name}</span>
                            <p>{item.rating}</p>
                            <span>{item.relative_time_description}</span>
                            <p>{item.text}</p>
                        </div>
                    )}
                </div>
            }

        </>
    )
}

const mapStateToProps = (state) => {
    return {
        favList: state.favReducer.favList,
        placeDetail: state.searchReducer.placeDetail,
    }
}

export default connect(mapStateToProps, { AddToFavorites, deletePlace, togglePlaceDetail })(PlaceDetail)

