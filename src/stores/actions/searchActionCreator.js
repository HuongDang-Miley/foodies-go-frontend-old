import axios from 'axios'

export const nearbySearch = (keyword) => async dispatch => {
    let response = await axios.get(`http://localhost:4000/api/search/near-by-search/${keyword}`)
    // console.log('show all result in action file', response.data.results)

    return dispatch({
        type: "SHOW_NEARBY_SEARCH",
        results: response.data.results
    })
}

export const placeDetail = (id) => async dispatch => {
    let response = await axios.get(`http://localhost:4000/api/search/place-detail/${id}`)
    console.log('show all place detail in action file', response.data.result)

    return dispatch({
        type: 'SHOW_PLACE_DETAIL',
        placeDetail: response.data.result
    })
}

export const togglePlaceDetail = (boolean) => dispatch => {
    return dispatch({
        type: 'TOGGLE_PLACE_DETAIL',
        showPlaceDetail: boolean
    })

}



export const test = (input) => {
    return {
        type: 'TEST',
        text: input
    }
}