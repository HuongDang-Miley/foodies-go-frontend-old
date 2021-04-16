const initialState = {
    isAuth: false,
    token: "",
    registerMessage: "",
    loginMessage: "",
    user: {},
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
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