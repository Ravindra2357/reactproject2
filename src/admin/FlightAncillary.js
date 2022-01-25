import React, {useState,useEffect} from 'react';
import {Card, CardContent} from "@material-ui/core";
import Modal from '../Modal';
import {useSelector, useDispatch} from 'react-redux';
import {useLocation} from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import UpdateAncillary from './UpdateAncillary';
import { updateFlight } from '../store';
function FlightAncillary() {
    const flights =useSelector(state=>state.flights.flights);
    const search = useLocation().search;
    const name = new URLSearchParams(search).get('flightName');
    const flight = flights.find((flight)=>flight.name===name);
    const ancillaryServices = flight.ancillary;
    const [ancillaryName,setAncillaryName] = useState("")
    const [addAncillary, setAddAncillary] = useState(false);
    const [open, setOpen] =useState(false);
    const [updatedFlights, setUpdatedFlights] = useState(false);
    const dispatch = useDispatch();
    const btn_style ={
        backgroundColor: "#2b2b2b",
        color: "#FFF",
        fontFamily: "Arial",
        margin: "10px",
        padding: "5px"
    };
    const addButtonHandler = (e) =>{
       setAddAncillary(true); 
       setOpen(true);
    }
    const onClickHandler =(e) =>{
        setAncillaryName(e.currentTarget.getAttribute('data-ancillaryName'));
        setOpen(true);
    }
    const onCloseHandler =(e)=>{
        // e.preventDefault();
        setOpen(false);
        setAddAncillary(false);
        setAncillaryName("");
    };
    const onDeleteHandler =(e)=>{
        let flightIndex = flights.findIndex((flight)=>flight.name===name);
        delete flights[flightIndex].ancillary[e.currentTarget.getAttribute('data-ancillaryName')];
        setUpdatedFlights(true);
        
    }
    useEffect(() => {
        dispatch(updateFlight(flights));
        setUpdatedFlights(false);
    }, [flights])
    return (
        <div>
            <Card className="table_card">
                <CardContent className="table_content">
                    <button className="add_ancilliary" style={btn_style} onClick={addButtonHandler}>Add Ancilliary</button>
                    <table className="passenger_list">
                        <thead className="table_header">
                            <tr>
                                <th>Ancilliary Name</th>
                                <th>Available</th>
                                <th>update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody className="table_body">
                        {
                            Object.keys(ancillaryServices).map((innerAttr, index)=>(
                                <tr key={innerAttr} className="table_row">
                                    <td>{innerAttr}</td>
                                    <td>{ancillaryServices[innerAttr]?"YES":"NO"}</td>
                                    <td>
                                        <EditIcon className ="editIcon" onClick={onClickHandler} data-ancillaryName={innerAttr}/>
                                        {/* <button className="changeseat" >update Ancilliary</button> */}
                                    </td>
                                    <td>
                                        <DeleteIcon className= "deleteIcon" onClick={onDeleteHandler} data-ancillaryName={innerAttr}/>
                                    </td>
                                </tr> 
                            ))}
                        </tbody>
                    </table>
                    
                </CardContent>
            </Card>
            <Modal show={open}  close={onCloseHandler} title="Ancillary Service">
                <UpdateAncillary close={onCloseHandler}  ancillaryName={ancillaryName} currentFlight={flight} addAncillary={addAncillary}/>
            </Modal>
        </div>
    )
}

export default FlightAncillary;
