const initialState = {
    isAuth: false,
    registerMessage: "",
    errorMessage: "",
    user: {},
    userLocation: null,
    userLatLng: null,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'HANDLE_ERROR_MESSAGE':
            console.log(action)
            return {
                state,
                errorMessage: action.errorMessage,
                successMessage: action.successMessage,
            }

        case "GET_USER_LOCATION":
            console.log('action from get user location', action)
            return {
                ...state,
                userLocation: action.userLocation,
                userLatLng: action.userLatLng
            }
        // case "LOGIN":
        //     console.log('action from login', action)
        //     return {
        //         ...state,
        //         errorMessage: action.errorMessage
        //     }
        case 'REGISTER':
            console.log(action)
            return {
                ...state,
                registerMessage: action.registerMessage
            }

        case 'TEST_GOOGLE_API':
            console.log(action)
            return state

        default: return state
    }
}

export default authReducer