import React,{useState,useEffect} from 'react';
import EventSeatIcon from '@material-ui/icons/EventSeat';
import { Tooltip } from '@material-ui/core';
import './SeatMap.css';
import {connect} from 'react-redux';
import Dropdown from './Dropdown';
import data from './data/flights';
import Modal from './Modal';
import Ancillary from './Ancillary';
import StopIcon from '@material-ui/icons/Stop';
import {useSelector, useDispatch} from 'react-redux';
import { updateFlight } from './store';
function SeatMap(props) {
    const flights = useSelector(state => state.flights.flights);
    const flight= props.flight;
    const seat_icon=[]; 
    const [open, setOpen] =useState(false);
    const [passengerDetails,setPassengerDetails] = useState({});
    const dispatch = useDispatch();
    const onClickHandler =(seat)=>{
        setPassengerDetails(seat);
        // setOpen(true);
        if(props.pageName ==="inflight"){
            // setPassengerDetails(seat);
            setOpen(true);
        }else{
            let flightIndex = flights.findIndex((currentflight)=> currentflight.name === flight.name);
            let updatedFlight = flight;
            let passengerIndex = flight.passengers.findIndex((currentpassenger)=>currentpassenger.seatNo === seat.i+1)
            let passenger = flight.passengers.find((currentpassenger)=>currentpassenger.seatNo===seat.i+1)
                if(passenger.isCheckedIn){
                    passenger["isCheckedIn"] =false;
                }else{
                     passenger['isCheckedIn'] = true;
                }
                console.log(passenger);
                flight.passengers[passengerIndex] = passenger;
                flights[flightIndex] = flight;
                dispatch(updateFlight(flights));
        }
          
    };
    const onCloseHandler =(e) =>{
        // console.log(passengerDetails);
        // setPassengerDetails({});
        setOpen(false);
    };

    // useEffect(() => {
        
    // }, [open])
//     const onFlightChange =(e)=>{
//         const flight_name = e.target.value;
//         console.log(flight_name)
//         if(flight_name!="select"){
//            flights.map(flight=>{
//                if(flight.name==flight_name){
                  
//                    setFlight(flight.name);
//                 setSeats(flight.seats);
//                }
//            })
//     }else{
//         setSeats(0)
//         setFlight("select");
//     }
    
// };
        for(var i=0;i<flight.seats;i++){
            const title = "seatNo: "+ (i+1);
                var iconColor="grey";
                var ancillaryServices ={};
                
            for (var passenger of flight.passengers){
                if (i+1==passenger.seatNo){
                    if(props.pageName ==="checkin"){
                        if (passenger.isCheckedIn){
                            iconColor = "black";
                            if(passenger.ancillary.wheelChair){
                                iconColor = "blue";
                            }
                            if(passenger.ancillary.infant){
                                iconColor = "violet";
                            }
                        }else{
                            iconColor = "purple"
                        }
                        
                    }else{
                        if(passenger.ancillary.wheelChair){
                            iconColor = "blue";
                        }
                        if(passenger.ancillary.infant){
                            iconColor = "violet";
                        }
                        if(passenger.ancillary.specialMeals){
                            iconColor="skyblue"
                        }                        
                    }
                    ancillaryServices = passenger.ancillary;
                    break;
                }
                }
                 seat_icon.push(
                {i,iconColor,ancillaryServices}
                )      
        }
    return (
        <div className="seatmap">
        {/* //     <div className="dropdown">
        //         <select name="flights" id="flights" onChange={onFlightChange} value={flight}>
        //             <option value="select">select</option>
        //             {flights.map(flight=>(<option value={flight.name}>{flight.name}</option>))}
        //         </select>
        //     </div> */}
            <div className="seats">
                {seat_icon.map((seat)=>(
                    <Tooltip title={`seatNo: ${seat.i+1}`} key={seat.i+1}>
                    <EventSeatIcon 
                    onClick={seat.iconColor!=="grey"?()=>onClickHandler(seat):undefined}
                    // color={seat.iconColor} 
                    style={{ color: `${seat.iconColor}` }}
                    className="seatIcon" 
                    fontSize="large" 
                    />
                    </Tooltip>
                ))}   
                   
            </div>
            <div className="seatmap_classification">
                <div className="color_description">
                   <p><span><StopIcon className="stopicon" style={{ color: "blue" }}/></span><br/>Wheel Chair</p>
                   <p><span><StopIcon className="stopicon" style={{ color: "violet" }}/></span><br/>Infant</p>
                   {props.pageName ==="checkin"&&<p><span><StopIcon className="stopicon" style={{ color: "black" }}/></span><br/>CheckedIN</p>}
                   {props.pageName ==="checkin"&&<p><span><StopIcon className="stopicon" style={{ color: "purple" }}/></span><br/>Not CheckIN</p>}
                   <p><span><StopIcon className="stopicon" style={{ color: "grey" }}/></span><br/>Not Booked/Available</p>
                   {props.pageName ==="inflight"&&<p>
                   <span><StopIcon className="stopicon" style={{ color: "skyblue" }}/></span><br/>Special Meals
                    </p>
                }
                </div>
                
            
            </div>
            <div className="modal" >
             <Modal show={open}  close={onCloseHandler} title="Ancillary Services">
                 <Ancillary ancillary={passengerDetails.ancillaryServices} close={onCloseHandler} seatNo={passengerDetails.i+1} flight={flight}/>
             </Modal>
            </div>
           
           {/* <h2>{props.user.email}</h2> */}

        </div>
    
    )
}

export default SeatMap;
