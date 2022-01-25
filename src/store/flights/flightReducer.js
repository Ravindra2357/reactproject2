import { UPDATE } from "./flightTypes";
import data from '../../data/flights.json';

const initialState ={
    flights :data.flights
}

const flightReducer =(state = initialState, action) =>{
    switch(action.type){
        case UPDATE: return({
            ...state,
            flights: action.payload,
        });
        default:
            return state;
    }
}

export default flightReducer;