

import axios from 'axios'

export const AddToFavorites = (userId, place) => async dispatch => {

    let addPlace = {
        formatted_phone_number: place.formatted_phone_number,
        geometry: place.geometry,
        name: place.name,
        place_id: place.place_id,
        rating: place.rating,
        url: place.url,
        vicinity: place.vicinity,
        website: place.website,
        note: ''
    }

    await axios.post('http://localhost:4000/api/favorites/addToFavorites', { userId: userId, place: addPlace })
    return dispatch({
        type: 'ADD_TO_FAVORITES',
        newPlace: place
    })
}

//===================================================================================================================
//===================================================================================================================


export const loadFavorites = (id) => async dispatch => {
    // use query in the link
    // let response = await axios.get(`http://localhost:4000/api/favorites/loadFavorites?mileydawn=${"6080bf62ff140a8cd8cfad14"}`)

    //use query not in the link
    let response = await axios.get('http://localhost:4000/api/favorites/loadFavorites', { params: { userId: id } })
    // console.log('response in fvaction Creator', response.data)

    return dispatch({
        type: "LOAD_FAVORITES",
        favList: response.data
    })
}


//===================================================================================================================
//===================================================================================================================

export const addNote = (favList, userId, placeId, note) => async dispatch => {

    await axios.post('http://localhost:4000/api/favorites/addNote', {
        userId: userId,
        placeId: placeId,
        note: note
    })

    let updateFavList = favList.map(item => {
        if (item.place_id === placeId) {
            item.note = note
        } return item
    })

    return dispatch({
        type: "ADD_NOTE",
        favList: updateFavList
    })
}

//===================================================================================================================
//===================================================================================================================

export const deleteNote = (favList, userId, placeId) => async dispatch => {

    await axios.post('http://localhost:4000/api/favorites/addNote', {
        userId: userId,
        placeId: placeId,
        note: ''
    })

    let updateFavList = favList.map(item => {
        if (item.place_id === placeId) {
            item.note = ''
        } return item
    })

    return dispatch({
        type: "ADD_NOTE",
        favList: updateFavList
    })
}

//===================================================================================================================
//===================================================================================================================

export const deletePlace = (favList, userId, placeId) => async dispatch => {
    

    await axios.delete('http://localhost:4000/api/favorites/deletePlace', {
        params: {
            userId: userId,
            placeId: placeId,
        }
    })

    let updateFavList = favList.filter(item => item.place_id !== placeId)
    console.log('updateFavList from deletePlae', updateFavList)

    return dispatch({
        type: "DELETE_PLACE",
        favList: updateFavList
    })
}
