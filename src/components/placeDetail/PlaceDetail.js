import React from 'react'

export default function PlaceDetail(props) {
    console.log(props)
    return (
        <div>
            <button onClick={() => props.togglePlaceDetail(false)}>{`<- Back`}</button>
            <p>{props.placeDetail.place_id}</p>
            <h2>Name</h2>
            <p>Rating:</p>
            <p>Price:</p>
            <p>Website:</p>
            <p>Address:</p>
            <p>Phone:</p>
            <p>Website:</p>
            <button onClick={() => console.log('click')}>Add To Favorite</button>
        </div>
    )
}
