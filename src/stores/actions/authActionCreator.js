import Axios from './Axios.js'
import axios from 'axios'
let key = process.env.REACT_APP_GEOLOCATION_DB_KEY

//=============================================================================================
//=============================================================================================

export const register = (username, email, password) => async dispatch => {
    let userInfo = { username, email, password };
    try {
        let newUser = await Axios.post('/users/register', userInfo)

        return dispatch({
            type: 'REGISTER',
            registerMessage: newUser.data.message,
            // user: newUser.data.newUser
        })
    

    } catch (error) {
        if (error.response.status === 409) {
            return dispatch({
                type: 'REGISTER',
                registerMessage: 'Email already exist. Try again or Login',
            })
        }
        throw (error)
    }
}

//=============================================================================================
//=============================================================================================

export const login = (email, password) => async dispatch => {
    let userInfo = { email, password }

    try {
        let response = await Axios.post('/users/login', userInfo)

        if (response.data.status === 500 || response.data.status === 409) {
            return dispatch({ type: 'HANDLE_ERROR_MESSAGE', errorMessage: response.data.message })
        } else {
            localStorage.setItem('userToken', response.data.token)
        }

    } catch (error) { throw (error) }
}

export const handleErrorMessage = (message) => dispatch => {
    return dispatch({ type: 'HANDLE_ERROR_MESSAGE', errorMessage: message })
}

export const getUserLocation = () => async dispatch => {
    let response = await axios.get(`https://geolocation-db.com/json/${key}`)

    return dispatch({
        type: "GET_USER_LOCATION",
        userLocation: response.data,
        userLatLng: `${response.data.latitude},${response.data.longitude}`
    })
}
