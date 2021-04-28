
const initialState = {
    travelMode: 'WALKING'
}

const mapReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case 'TRAVEL_MODE':
            return {
                ...state,
            }

        default: return state
    }
}



export default mapReducer


