
const initialState = {
    places: [],
    // placeDetail: {},
    placeDetail: null,
    showPlaceDetail: false
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_PLACE_DETAIL':
            return {
                ...state,
                showPlaceDetail: action.showPlaceDetail
            }
        case 'SHOW_PLACE_DETAIL':
            console.log(action.placeDetail)
            return {
                ...state,
                placeDetail: action.placeDetail
            }
        case 'SHOW_NEARBY_SEARCH':
            return {
                ...state,
                places: action.results,
            }

        default: return state
    }
}



export default searchReducer


