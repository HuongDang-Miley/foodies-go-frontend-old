import axios from 'axios'
import placeDetail from '../../data/placeDetail.json'
// import sushiPlaces from '../../data/sushiPlaces.json'
// import burgerPlace from '../../data/burgerPlace.json'
// const key = process.env.GOOGLE_API_KEY
// const key = 'AIzaSyALhFgmCW6bVy6JdBOF_ccNtu1NgrfRxiw'

export const getNearbySearch = (keyword) => async dispatch => {
    // backend
    let response = await axios.get(`http://localhost:4000/api/search/near-by-search/${keyword}`)
    // frontend
    // let response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.67,-73.95&radius=1500&keyword=${keyword}&key=${key}`)

    return dispatch({
        type: "SHOW_NEARBY_SEARCH",
        results: response.data.results,  //<== result from google api call frontend/backend 
        // results: sushiPlaces.results //<== result of hardcode 
    })
}

export const getPlaceDetail = (id) => async dispatch => {
    // console.log('placeDetail', placeDetail)
    // backend
    let response = await axios.get(`http://localhost:4000/api/search/place-detail/${id}`) //<== Request of hardcode 
    // frontend
    // let response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&fields=name,place_id,geometry,rating,price_level,formatted_phone_number,website,url,vicinity,types,reviews&key=${key}`)

    return dispatch({
        type: 'SHOW_PLACE_DETAIL',
        placeDetail: response.data.result  //<== result from google api call frontend/backend 
        // placeDetail: placeDetail.result  //<== result of hardcode frontend
    })
}

export const togglePlaceDetail = (boolean) => dispatch => {
    return dispatch({
        type: 'TOGGLE_PLACE_DETAIL',
        showPlaceDetail: boolean
    })
}


export const getfilterList = (places, rating = null, price = null, openHour = null) => dispatch => {
    let copyArr = [...places]

    if (rating) {
        copyArr = copyArr.filter(item =>
            Number(item.rating) > Number(rating)
            && Number(item.rating) < Number(rating) + 1)
    }

    if (price) {
        copyArr = copyArr.filter(item =>
            Number(item.price_level) === Number(price))
    }

    if (openHour) {
        copyArr = copyArr
            .filter(item => item.business_status === 'OPERATIONAL')
            .filter(item => item.opening_hours.open_now === true)
    }

    return dispatch({
        type: 'FILTER',
        filteredList: copyArr
    })
}

export const mouseEnter = (place) => dispatch => {
    return dispatch({ type: 'MOUSE_ENTER', place: place })
}

