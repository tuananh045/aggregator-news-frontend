import { combineReducers } from "redux"
import authReducer from 'redux/reducers/auth'
const rootReducer = combineReducers({
    auth: authReducer
})

export default rootReducer