import React, { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import { AddToFavorites } from '../../stores/actions/favActionCreator'
import { connect } from 'react-redux'

function PlaceDetail(props) {
    // console.log('props in placeDetail', props.placeDetail)

    let [userId, setUserId] = useState('')

    useEffect(() => {
        let userToken = localStorage.getItem('userToken')
        if (userToken) {
            let decoded = jwtDecode(userToken)
            setUserId(decoded.id)
        }
    })


    const handleAddToFavorites = () => {
        userId === ''
            ? console.log('Please Sign In')
            : props.AddToFavorites(userId, props.placeDetail)
    }

    return (
        <div>
            {/* <div
              
            > */}
            <button onClick={() => props.togglePlaceDetail(false)}>{`<- Back`}</button>
            <p>{props.placeDetail.place_id}</p>
            <h2>Name: {props.placeDetail.name}</h2>
            <p>Rating: {props.placeDetail.rating}</p>
            {/* <p>Price: {props.placeDetail.price_level}</p> */}
            <p>Website: {props.placeDetail.website}</p>
            <p>Address:{props.placeDetail.vicinity}</p>
            <p>Phone: {props.placeDetail.formatted_phone_number}</p>
            {/* </div> */}
            <button onClick={() => handleAddToFavorites(userId, props.placeDetail)}>Add To Favorite</button>
            {/* <button onClick={() => console.log('click')}>Add To Favorite</button> */}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        favPlaces: state.favReducer
    }
}

export default connect(mapStateToProps, { AddToFavorites })(PlaceDetail)

