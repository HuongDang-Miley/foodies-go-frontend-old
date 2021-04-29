
const initialState = {
    travelMode: 'WALKING',
    venues: []
}

const mapReducer = (state = initialState, action) => {
    switch (action.type) {

        case "GET_VENUES":
            console.log(action)
            return {
                ...state,
                venues: action.venues
            }


        case 'TRAVEL_MODE':
            return {
                ...state,
            }

        default: return state
    }
}



export default mapReducer


