// import { lighten } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import data from './data/flights';

function Dropdown() {
    const flights = data.flights;
    const [seats,setSeats] = useState(0);
    const [flight, setFlight] = useState("select")
    const onFlightChange =(e)=>{
        const flight_name = e.target.value;
        console.log(flight_name)
        if(flight_name!="select"){
           flights.map(flight=>{
               if(flight.name==flight_name){
                  
                   setFlight(flight.name);
                setSeats(flight.seats);
               }
           })
    }else{
        setSeats(0)
    }
    
}
    return (
        <div>
            <select name="flights" id="flights" onChange={onFlightChange} value={flight}>
                <option value="select">select</option>
                {flights.map(flight=>(<option value={flight.name}>{flight.name}</option>))}
            </select>
        </div>
    )
}

export default Dropdown
