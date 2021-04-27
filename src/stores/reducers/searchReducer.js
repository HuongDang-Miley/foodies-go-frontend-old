
const initialState = {
    placesWithNoFilter: [],
    places: [],
    // filteredList: [],
    placeDetail: null,
    showPlaceDetail: false
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FILTER":
            console.log(action)
            return {
                ...state,
                places: action.filteredList
            }

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
                placesWithNoFilter: action.results,
                places: action.results
            }

        default: return state
    }
}



export default searchReducer


