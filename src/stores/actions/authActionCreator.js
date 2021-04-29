import axios from 'axios'

//=============================================================================================

export const register = (username, email, password) => async dispatch => {
    let userInfo = { username, email, password };
    try {
        let newUser = await axios.post('http://localhost:3001/api/users/register', userInfo)
        // console.log('newUser in auth creator', newUser.data)

        return dispatch({
            type: 'REGISTER',
            registerMessage: newUser.data.message,
            user: newUser.data.newUser
        })

    } catch (error) {
        if (error.response.status === 409) {
            return dispatch({
                type: 'REGISTER',
                registerMessage: 'Conflict',
            })
        }
        throw (error)
    }
}

//=============================================================================================

export const login = (email, password) => async dispatch => {
    let userInfo = { email, password }

    try {
        let response = await axios.post('http://localhost:3001/api/users/login', userInfo)
        localStorage.setItem('userToken', response.data.token)
        return dispatch({ type: 'LOGIN' })

    } catch (error) { throw (error) }
}

export const getUserLocation = (location) => async dispatch => {
    let response = await axios.get('https://geolocation-db.com/json/f9902210-97f0-11eb-a459-b997d30983f1')
    // console.log('response.data in action creator', response.data)
    return dispatch({type: "GET_USER_LOCATION",
     userLocation: response.data,
     userLatLng: `${response.data.latitude},${response.data.longitude}`
    })
}
