import Axios from './Axios.js'
const key = process.env.GOOGLE_API_KEY


export const getNearbySearch = (keyword, location) => async dispatch => {
    // let response = await Axios.get(`/search/near-by-search`, { params: { keyword: keyword, location: location } })
    let response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.67,-73.95&radius=1500&keyword=${keyword}&key=${key}`)
    
    return dispatch({
        type: "SHOW_NEARBY_SEARCH",
        results: response.data.results,  //<== result from google api call frontend/backend 
    })
}


export const getPlaceDetail = (id) => async dispatch => {

    // let response = await Axios.get(`/search/place-detail/${id}`) //<== Request of hardcode 
    let response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&fields=name,place_id,geometry,rating,price_level,formatted_phone_number,website,url,vicinity,types,reviews&key=${key}`)

    return dispatch({
        type: 'SHOW_PLACE_DETAIL',
        placeDetail: response.data.result  //<== result from google api call frontend/backend 
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

export const getSearchWord = (keyword) => dispatch => {
    return dispatch({ type: 'GET_SEARCH_WORD', text: keyword })
}

