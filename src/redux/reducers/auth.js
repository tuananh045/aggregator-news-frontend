import {
    GET_CURRENT_USER,
    SET_CURRENT_USER,
    GET_ERRORS
} from '../constants'

const initialState = {
    user: {},
    isFetching: true
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                user: action.payload,
                isFetching: false
            }
        case GET_CURRENT_USER:
            return {
                ...state,
                user: action.payload,
                isFetching: false
            }
        case GET_ERRORS:
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default authReducer;