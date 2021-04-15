import axios from 'axios'

export const nearbySearch = (keyword) => async dispatch => {
    let response = await axios.get(`http://localhost:4000/api/search/near-by-search/${keyword}`)
    console.log('show all result in action file', response.data.results)

    return dispatch({
        type: "SHOW_NEARBY_SEARCH",
        results: response.data.results
    })
}



export const test = (input) => {
    return {
        type: 'TEST',
        text: input
    }
}