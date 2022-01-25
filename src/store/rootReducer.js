import {combineReducers} from 'redux';
import userReducer from './users/userReducer';
import flightReducer from './flights/flightReducer';

const rootReducer = combineReducers({
    users: userReducer,
    flights: flightReducer
})

export default rootReducer;