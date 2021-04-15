// export const showSearchResult = () => async dispatch => {
//     const endPoint = "https://api.foursquare.com/v2/venues/explore?"
//     const parameters = {
//         client_id: "PMHC2WA1VCBHVYOPPSJ0QSBYTLRF4PNJ04OWVWV0PZJ0QFIR",
//         client_secret: "CULSZZ44YAEBOWBFGPB4BF5ISRXXSNYR0EE3JV3CNE2ZWHV0",
//         query: "stake",
//         near: "manhattan",
//         v: "20182507"
//     }

//     let response = await axios.get(endPoint + new URLSearchParams(parameters))
//     console.log(response.data.response.groups[0].items)
//     return dispatch({
//         type: "SHOW_SEARCH_RESULT",
//         placesArray: response.data.response.groups[0].items
//     })
// }