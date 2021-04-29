
const initialState = {
    travelMode: 'WALKING',
    distance: '',
    duration: '',
    venues: []
}

const mapReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_DISTANCE":
            return {
                ...state,
                distance: action.distance
            }
            
        case "GET_DURATION":
            return {
                ...state,
                duration: action.duration
            }

        case "GET_VENUES":
            console.log(action)
            return {
                ...state,
                venues: action.venues
            }


        case 'TRAVEL_MODE':
            console.log(action)
            return {
                ...state,
                travelMode: action.travelMode
            }

        default: return state
    }
}



export default mapReducer


