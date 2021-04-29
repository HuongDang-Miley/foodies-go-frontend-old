import axios from 'axios'

export const getTravelMode = (text) => dispatch => {
        return dispatch({ type: 'TRAVEL_MODE', travelMode: text })
}


export const getVenues = () => async dispatch => {
        const endPoint = "https://api.foursquare.com/v2/venues/explore?"
        const parameters = {
                client_id: "PMHC2WA1VCBHVYOPPSJ0QSBYTLRF4PNJ04OWVWV0PZJ0QFIR",
                client_secret: "CULSZZ44YAEBOWBFGPB4BF5ISRXXSNYR0EE3JV3CNE2ZWHV0",
                query: "food",
                near: "manhattan",
                v: "20182507"
        }

        let response = await axios.get(endPoint + new URLSearchParams(parameters))
        console.log('response.data', response.data.response.groups[0].items)
        return dispatch({ type: 'GET_VENUES', venues: response.data.response.groups[0].items })

}