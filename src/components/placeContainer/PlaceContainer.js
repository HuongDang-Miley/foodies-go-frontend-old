import React from 'react'
import './placeContainer.css'

export default function PlaceContainer(props) {
    // console.log('props from place card', props)

    return (
        <div className='place-container'>
            <button className='save-btn'
                onClick={() => console.log(props.place.place_id)}
            >Add To Favorite</button>
            <h2>{props.place.name}</h2>
            <p>Rating:{props.place.rating}</p>
            <p>Total Ratings:{props.place.user_ratings_total}</p>
            <p>Price:{props.place.price_level}</p>
            <p>{props.place.vicinity}, {props.place.plus_code.compound_code}</p>
            {/* {props.place.opening_hours.open_now ? <p>Open Now</p> : null} */}
        </div>
    )
}
