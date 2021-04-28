export const getTravelMode = (text) =>  dispatch => {
        return dispatch({ type: 'TRAVEL_MODE', travelMode: text })
}