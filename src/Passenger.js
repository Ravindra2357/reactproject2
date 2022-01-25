import React, { useEffect, useState } from 'react';
import {Card, CardContent, MenuItem, Select} from "@material-ui/core";
import './passenger.css';
// import FilterListIcon from '@material-ui/icons/FilterList';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import {useSelector, useDispatch} from 'react-redux';
import { updateFlight } from './store/flights/flightActions';
function Passenger(props) {
    const dispatch = useDispatch();
    const flights = useSelector(state=>state.flights.flights);
    const passengers = props.flight.passengers;
    const [filteredData, setfilteredData] = useState(passengers);
    // console.log("passengers",passengers)
    // console.log("FilteredData",filteredData);
    const [filterOptionValue,setFilterOptionValue] = useState("All");
    const [currentSeat, setCurrentSeat] = useState(null);
    const [changedSeatNo, setChangedSeatNo] = useState(null);
    // const [changeSeat, setChangeSeat] = useState(false);
    const [open, setOpen] = useState(false);
    const [updatedFlights, setUpdatedFlights] = useState([]);
    const handleClickOpen = (e) => {
        console.log(e.target.getAttribute('data-currentseat'));
        setCurrentSeat(e.target.getAttribute('data-currentseat'));
        setOpen(true);
      };
    
      const handleClose = (e) => {
        if(currentSeat!==changedSeatNo && (changedSeatNo>=1 && changedSeatNo <=props.flight.seats) ){
                    console.log("seatupadtes",currentSeat,"changeseatNO",changedSeatNo);
                    const currentFlight = props.flight;
                    // const seatUpdated =[];
                    const passenger1 = passengers.find((passenger) => passenger.seatNo ===parseInt(currentSeat));
                    const index1 = passengers.findIndex((passenger) => passenger.seatNo ===parseInt(currentSeat));
                    const passenger2 = passengers.find((passenger) => passenger.seatNo ===parseInt(changedSeatNo));
                    const index2 = passengers.findIndex((passenger) => passenger.seatNo ===parseInt(changedSeatNo));
                    const flightIndex = flights.findIndex((flight) =>flight.name === props.flight.name);
                    passenger1['seatNo'] = parseInt(changedSeatNo);
                    currentFlight.passengers[index1] = passenger1;
                    if(index2!=-1){
                        passenger2['seatNo'] = parseInt(currentSeat);
                        currentFlight.passengers[index2] = passenger2;
                    }
                    
                    flights[flightIndex] = currentFlight;
                    // console.log(passenfger['seatNo']);
                    console.log("updatedFlights",flights);
                    
                    
                    dispatch(updateFlight(flights));
                    // console.log(seatUpdated);
                }
        // setChangeSeat(true);
        setOpen(false);
      };
    //   const setTextvalue =(e)=>{
    //       setChangedSeatNo(e.target.value);
    //   }
    const sortData =(e) =>{
        setFilterOptionValue(e.target.value);
    }
    
    useEffect(()=>{
        setfilteredData(passengers);
        setFilterOptionValue("All");
    },[passengers]);

    useEffect(()=>{
        
        var filtered =[]
        if(filterOptionValue === "NotCheckedIn"){
            console.log(filterOptionValue);
            passengers.map((passenger)=>{
                if(passenger.isCheckedIn===false){
                    filtered.push(passenger);
                    console.log("flteredDAta",filtered);
                }
            })
        }else{
            if(filterOptionValue === "isCheckedIn"){
                passengers.map((passenger)=>{
                if(passenger.isCheckedIn===true){
                    filtered.push(passenger);
                }
            })
            }else{
                if(filterOptionValue==="All"){
                    filtered = passengers;
                }else{
                    passengers.map((passenger)=>{
                    if(passenger.ancillary[filterOptionValue]===true){
                        filtered.push(passenger);
                    }
                })
                }   
            }   
        }
        setfilteredData(filtered);
    },[filterOptionValue]);

    return (
        <div>
            <div className="filter">
                <h6>Filter</h6> 
            {/* <FormControl> */}
                <Select  onChange={sortData} value={filterOptionValue} >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="wheelChair">wheelChair</MenuItem>
                    <MenuItem value="isCheckedIn">isCheckedIn</MenuItem>
                    <MenuItem value="NotCheckedIn">NotCheckedIn</MenuItem>
                    <MenuItem value="infant">infant</MenuItem>
                </Select>
            {/* </FormControl> */}
            </div>
        
            <Card className="table_card">
                <CardContent className="table_content">
                    <table className="passenger_list">
                        <thead className="table_header">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>EmailId</th>
                                <th>PhoneNo</th>
                                <th>SeatNo</th>
                                <th>Ancillary Service</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="table_body">
                        {
                            filteredData.map((passenger)=>(
                                <tr key={passenger.id} className="table_row">
                                    <td>{passenger.id}</td>
                                    <td>{passenger.name}</td>
                                    <td>{passenger.mailId}</td>
                                    <td>{passenger.phoneNo}</td>
                                    <td>{passenger.seatNo}</td>
                                    <td>
                                        <li><span><input className="checkbox" type="checkbox" defaultChecked={passenger.ancillary.infant} disabled /></span>Infant</li>
                                        <li><span><input className="checkbox" type="checkbox" defaultChecked={passenger.ancillary.wheelChair} disabled/></span>Wheel Chair</li>
                                        <li><span><input className="checkbox" type="checkbox" defaultChecked={passenger.ancillary.vegMeals} disabled/></span>Veg Meals</li>
                                        <li><span><input className="checkbox" type="checkbox" defaultChecked={passenger.ancillary.nonVegMeals} disabled/></span>Non-veg Meals</li>
                                        <li><span><input className="checkbox" type="checkbox" defaultChecked={passenger.ancillary.specialMeals} disabled/></span>Special Meals</li>
                                    </td>
                                    <td>
                                        <button className="changeseat" onClick={handleClickOpen} data-currentseat={passenger.seatNo}>change seat</button>
                                    </td>
                                </tr> 
                            ))}
                        </tbody>
                    </table>
                    
                </CardContent>
            </Card>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please Enter changed seatNo
                        </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="seat"
                                label="Seat No"
                                placeholder={`seatNo in range 1 to ${props.flight.seats}`}
                                type="Number"
                                required="true"
                                fullWidth
                                onChange={(e)=>setChangedSeatNo(e.target.value)}
                            />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleClose} color="primary">
                            Change Seat
                        </Button>
                    </DialogActions>
            </Dialog>
        </div>
    )
}

export default Passenger

