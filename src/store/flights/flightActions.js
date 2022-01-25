import {UPDATE} from './flightTypes';

export const updateFlight = (flights) =>{
    return {
        type: UPDATE,
        payload: flights
    }
}