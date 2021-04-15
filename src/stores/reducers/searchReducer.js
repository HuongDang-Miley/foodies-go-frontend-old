
const initialState = {
    places: [],
    placeDetail: {},
    showPlaceDetail: false
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_PLACE_DETAIL':
            console.log(action)
            return {
                ...state,
                showPlaceDetail: action.showPlaceDetail
            }
        case 'SHOW_PLACE_DETAIL':
            console.log(action)
            return {
                ...state,
                placeDetail: action.placeDetail
            }
        case 'SHOW_NEARBY_SEARCH':
            console.log('show all result in reducer', action)
            return {
                ...state,
                places: action.results,
            }

        default: return state
    }
}



export default searchReducer


