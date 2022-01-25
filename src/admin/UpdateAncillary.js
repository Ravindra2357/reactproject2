import React,{useState} from 'react';
import './UpdateAncillary.css';
import {useSelector, useDispatch} from 'react-redux';
import { updateFlight } from '../store';
function UpdateAncillary({close,ancillaryName,currentFlight,addAncillary}) {
    const flights =useSelector(state=>state.flights.flights);
    const [ancillaryServiceName,setAncillaryServiceName] = useState(ancillaryName);
    const [availability, setAvailability] = useState("");
    const dispatch =  useDispatch();

    const formSubmit=(e)=>{
        e.preventDefault();
        let flightIndex = flights.findIndex((flight)=>flight.name===currentFlight.name);
        flights[flightIndex].ancillary[ancillaryServiceName]=availability=='Yes'?true:false;
        console.log(flights);
        // dispatch(updateFlight(flights));
        close();
    }
    return (
            <form className="ancillary_update_form" onSubmit={(e)=>formSubmit(e)}>
                    <label htmlFor="AncillaryName">Ancillary Name</label><br/>
                    <input type="text" value={ancillaryServiceName} onChange={(e)=>setAncillaryServiceName(e.target.value)}/><br/>
                    <label htmlFor="Available">Available</label><br/>
                    <input type="radio" name="availability" value="Yes" onChange={(e=>setAvailability(e.target.value))}/>
                    <label htmlFor="yes">Yes</label><br/>
                    <input type="radio" name="availability" value="No"  onChange={(e=>setAvailability(e.target.value))}/>
                    <label htmlFor="no">No</label><br/>
                    <button onClick={close}>Cancel</button>
                    <button type="submit" >Confirm</button>

                </form>
    )
}

export default UpdateAncillary
