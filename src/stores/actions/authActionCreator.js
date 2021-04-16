import axios from 'axios'

export const register = (username, email, password) => async dispatch => {
    let userInfo = { username, email, password };
    console.log(userInfo)
    try {
        let newUser = await axios.post('http://localhost:4000/api/users/register', userInfo)
        console.log('newUser in auth creator', newUser.data)
        // throw ('user successfully created. Login')

        return dispatch({
            type: 'REGISTER',
            registerMessage: newUser.data.message,
            user: newUser.data.newUser
        })

    } catch (err) {
        throw (err)
    }
}

export const testGoogleAPI = () => async dispatch => {
    // let response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJqTLS3nJZwokRGdkiM6Hj-BU&fields=name,place_id,geometry,rating,price_level,formatted_phone_number,website,url,vicinity,types,reviews&key=AIzaSyALhFgmCW6bVy6JdBOF_ccNtu1NgrfRxiw`)
    let response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.67,-73.95&radius=1500&keyword=burger&key=AIzaSyALhFgmCW6bVy6JdBOF_ccNtu1NgrfRxiw`)
    console.log('show all place detail in action file', response.data)

    return dispatch({
        type: 'TEST_GOOGLE_API',
        placeDetail: response.data
    })
}

