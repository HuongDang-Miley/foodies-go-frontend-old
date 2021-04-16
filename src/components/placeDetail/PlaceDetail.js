import React from 'react'

export default function PlaceDetail(props) {
    console.log(props)
    return (
        <div>
            <button onClick={() => props.togglePlaceDetail(false)}>{`<- Back`}</button>
            <p>{props.placeDetail.place_id}</p>
            <h2>Name: {props.placeDetail.name}</h2>
            <p>Rating: {props.placeDetail.rating}</p>
            {/* <p>Price: {props.placeDetail.price_level}</p> */}
            <p>Website: {props.placeDetail.website}</p>
            <p>Address:{props.placeDetail.vicinity}</p>
            <p>Phone: {props.placeDetail.formatted_phone_number}</p>
            <button onClick={() => console.log('click')}>Add To Favorite</button>
        </div>
    )
}

