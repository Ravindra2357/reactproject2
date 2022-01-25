import { LOGIN, LOGOUT } from "./userTypes"
import data from '../../data/flights.json';
const initialState ={
    users: data.users,
    loggedInuser:{ 
        userName:null,
        userRole:null,
        isLoggedin: false
    }
}

const userReducer =(state = initialState, action) =>{
    switch(action.type){
        case LOGIN: return({
            ...state.loggedInuser,
            userName: action.payload.userName,
            isLoggedin: action.payload.isloggedin,
            userRole: action.payload.role
        })
        case LOGOUT:
            return{
                ...state.loggedInuser,
                userName: action.payload.userName,
                isLoggedin: action.payload.isloggedin,
                userRole: action.payload.role
            }
        default:
            return state;
    }
}

export default userReducer;