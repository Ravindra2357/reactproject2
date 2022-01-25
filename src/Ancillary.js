import React,{useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import {useSelector, useDispatch} from 'react-redux';
import { updateFlight} from './store';
import './Ancillary.css'
function Ancillary({ancillary,close,seatNo,flight}) {
    const flights = useSelector(state=> state.flights.flights);
    const [infant, setInfant] = useState(ancillary.infant);
    const [wheelChair, setWheelChair] = useState(ancillary.wheelChair);
    const [vegMeals,setVegMeals] = useState(ancillary.vegMeals);
    const [nonVegMeals, setNonVegMeals] = useState(ancillary.nonVegMeals);
    const [specialMeals, setSpecialMeals] = useState(ancillary.specialMeals);
    const [disabled, setDisabled] = useState(true);
    const dispatch = useDispatch();
    const ClickHandler =(e)=>{
        e.preventDefault();
        const flightIndex = flights.findIndex((flightt) =>flightt.name === flight.name);
        // console.log(flights[flightIndex]);
        const index = flight.passengers.findIndex((passenger) => passenger.seatNo === seatNo);
        console.log(index);
        const updatedAncillary = {
              "infant": infant,
              "wheelChair": wheelChair,
              "vegMeals": vegMeals,
              "nonVegMeals": nonVegMeals,
              "specialMeals": specialMeals
        };
        // console.log(updatedAncillary);
        flights[flightIndex].passengers[index].ancillary=updatedAncillary;
        console.log(flights);
       
    }
    useEffect(() => {
         dispatch(updateFlight(flights));
    }, [flights])

    return (
        <form action="submit" class="ancillary_form" onSubmit={ClickHandler}>
          <input type="checkbox" name="" id="" defaultChecked={ancillary.infant} disabled={disabled} onChange={(e)=>setInfant(e.target.checked)}/><span>Infant</span><br/>
          <input type="checkbox" name="" id="" defaultChecked={ancillary.wheelChair} disabled={disabled} onChange={(e)=>setWheelChair(e.target.checked)}/><span>Wheel Chair</span><br/>
          <h6>Meals</h6>
          <input type="checkbox" name="" id="" defaultChecked={ancillary.vegMeals} disabled={disabled} onChange={(e)=>setVegMeals(e.target.checked)}/><span>Veg Meals</span><br/>
          <input type="checkbox" name="" id="" defaultChecked={ancillary.nonVegMeals} disabled={disabled} onChange={(e)=>setNonVegMeals(e.target.checked)}/><span>Non-Veg Meals</span><br/>
          <input type="checkbox" name="" id="" defaultChecked={ancillary.specialMeals} disabled={disabled} onChange={(e)=>setSpecialMeals(e.target.checked)}/><span>Special Meals</span><br/>
          <Button onClick ={()=>setDisabled(false)}>Change</Button><Button type="submit" onClick={close}>Confirm</Button>
        </form>
    )
}

export default Ancillary
