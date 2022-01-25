import React,{useState,useEffect} from 'react';
import Passenger from '../Passenger';
import {useSelector} from 'react-redux';
import {useLocation} from "react-router-dom";
import {Card, CardContent,  MenuItem, Select} from "@material-ui/core";
import Modal from '../Modal';
import Form from './UpdateForm';
import './PassengerList.css';
function PassengerList() {
    const flights =useSelector(state=>state.flights.flights);
    // console.log(flights);
    const search = useLocation().search;
    const name = new URLSearchParams(search).get('flightName'); 
    const flight = flights.find((flight)=>flight.name===name);
    const [currentPassenger, setCurrentPassenger] = useState({});
    const [open, setOpen] =useState(false);
    const [addPassenger, setAddPassenger] = useState(false);
    const [filterOptionValue,setFilterOptionValue] = useState("All");
    const [filteredPassengerData, setfilteredPassengerData] = useState(flight.passengers);
    // console.log(flight);
    const handleClickOpen =() =>{

    }
    const onClickHandler =(e)=>{
        let passenger = flight.passengers.find((passenger)=>passenger.id === parseInt(e.target.getAttribute('data-currentpassenger')))
        setCurrentPassenger(passenger)
        setOpen(true);  
    };
    const addButtonHandler =()=>{
        setAddPassenger(true);
        setOpen(true);
    }
    const onCloseHandler =(e) =>{
        // console.log(passengerDetails);
        setOpen(false);
        setAddPassenger(false);
    };
    const sortData =(e) =>{
        setFilterOptionValue(e.target.value);
    };
    useEffect(()=>{
        console.log(filterOptionValue);
        var filtered =[]
        if(filterOptionValue === "All"){
            filtered = flight.passengers;
        }else{
            if(filterOptionValue === "dob"){
                flight.passengers.map((passenger)=>{
                    if(passenger[filterOptionValue]===""){
                        filtered.push(passenger);
                        console.log("flteredDAta",filtered);
                    }
                })
            }else{
                flight.passengers.map((passenger)=>{
                    if(passenger.passportDetails[filterOptionValue]===""){
                        filtered.push(passenger);
                        console.log("flteredDAta",filtered);
                    }
                })
            }
            
        }
        // if(){
        //     console.log(filterOptionValue);
        //     flight.passengers.map((passenger)=>{
        //         if(passenger.passportDetails[passportNumber]===""){
        //             filtered.push(passenger);
        //             console.log("flteredDAta",filtered);
        //         }
        //     })
        // }else{
        //     if(filterOptionValue === "address"){
        //         flight.passengers.map((passenger)=>{
        //         if(passenger.passportDetails.address===""){
        //             filtered.push(passenger);
        //         }
        //     })
        //     }else{
        //         if(filterOptionValue==="All"){
        //             filtered = passengers;
        //         }else{
        //             passengers.map((passenger)=>{
        //             if(passenger.ancillary[filterOptionValue]===true){
        //                 filtered.push(passenger);
        //             }
        //         })
        //         }   
        //     }   
        // }
        setfilteredPassengerData(filtered);
    },[filterOptionValue]);
    
    const btn_style ={
        backgroundColor: "#2b2b2b",
        color: "#FFF",
        fontFamily: "Arial",
        margin: "10px",
        padding: "5px"
    };
    return (
        <div className="admin_passenger_list">
           <div className="filter">
                <p>Filter Missing Mandatory Requirements</p>
                <Select  onChange={sortData} value={filterOptionValue} >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="passportNumber">PassportNo</MenuItem>
                    <MenuItem value="address">address</MenuItem>
                    <MenuItem value="dob">dateofbirth</MenuItem>
                </Select>
           </div>
           <Card className="table_card">
                <CardContent className="table_content">
                    <button className="add_passenger_btn" style={btn_style} onClick={addButtonHandler}>Add Passenger</button>
                    <table className="passenger_list">
                        <thead className="table_header">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Ancillary Service</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="table_body">
                        {
                            filteredPassengerData.map((passenger)=>(
                                <tr key={passenger.id} className="table_row">
                                    <td>{passenger.id}</td>
                                    <td>{passenger.name}</td>
                                    <td>
                                        <li><span><input className="checkbox" type="checkbox" defaultChecked={passenger.ancillary.infant} disabled /></span>Infant</li>
                                        <li><span><input className="checkbox" type="checkbox" defaultChecked={passenger.ancillary.wheelChair} disabled/></span>Wheel Chair</li>
                                        <li><span><input className="checkbox" type="checkbox" defaultChecked={passenger.ancillary.vegMeals} disabled/></span>Veg Meals</li>
                                        <li><span><input className="checkbox" type="checkbox" defaultChecked={passenger.ancillary.nonVegMeals} disabled/></span>Non-veg Meals</li>
                                        <li><span><input className="checkbox" type="checkbox" defaultChecked={passenger.ancillary.specialMeals} disabled/></span>Special Meals</li>
                                    </td>
                                    <td>
                                        <button className="changeseat" onClick={onClickHandler} data-currentpassenger={passenger.id}>update passenger</button>
                                    </td>
                                </tr> 
                            ))}
                        </tbody>
                    </table>
                    
                </CardContent>
            </Card>
            <Modal show={open}  close={onCloseHandler} title="Passenger Update Form">
                <Form close={onCloseHandler} currentPassenger={currentPassenger} addPassenger={addPassenger} currentFlight={flight}/>
            </Modal>
        </div>
    )
}

export default PassengerList
