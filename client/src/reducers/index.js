import { combineReducers } from 'redux'

import { userReducer } from './userReducer'
import { feedReducer } from './feedReducer'

export default combineReducers({
        user: userReducer,
        feed: feedReducer
})