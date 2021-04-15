
const initialState = {
    places: [],
    text: 'initial text'
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case "TEST":
            console.log('action', action)
            return {
                ...state,
                text: action.text
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


