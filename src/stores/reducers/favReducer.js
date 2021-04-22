const initial = {
    favList: []
}

const favReducer = (state = initial, action) => {
    switch (action.type) {
        case "ADD_NOTE":
            console.log(action)
            return {
                ...state,
                favList: action.favList
            }

        case "LOAD_FAVORITES":
            // console.log(action)
            return {
                ...state,
                favList: action.favList
            }

        case "ADD_TO_FAVORITES":
            // console.log(action)
            return {
                ...state,
                favList: [...state.favList, action.newPlace]
            }
        default: return state
    }
}

export default favReducer