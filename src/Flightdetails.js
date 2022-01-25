import React, { useState } from 'react'
// import {Link} from 'react-router-dom';
import SeatMap from './SeatMap';
import Passenger from './Passenger';
import {Card, CardContent} from "@material-ui/core";
import './flightdetails.css';
function Flightdetails({flightDetails,page}) {
    // console.log(show)
    const seats = flightDetails.seats;
    const [seatmap, setSeatmap] = useState(false);
    const [passenger, setPassenger] = useState(false);
    // const [showFlightDetail,setShowFlightDetail] = useState(show);
    const onPassengerClickHandler =(e)=>{
        setSeatmap(false);
        setPassenger(true);
        // setShowFlightDetail(false);
    }
    const onSeatmapClickHandler =(e)=>{
        setPassenger(false);
        setSeatmap(true);
        // setShowFlightDetail(false);
    }
    return (
        <div>
        <Card className="flightDetails_card">
            <table>
                <thead>
                    <tr>
                        <th>FlightId</th>
                        <th>Flight Name</th>
                        <th>Departure</th>
                        <th>Arrival</th>
                        <th>Seats</th>
                        <th>Services</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{flightDetails.id}</td>
                        <td>{flightDetails.name}</td>
                        <td>{flightDetails.departure}</td>
                        <td>{flightDetails.arrival}</td>
                        <td>{flightDetails.seats}</td>
                        <td>{page==="checkin"&&<button onClick={onPassengerClickHandler}>passengers</button>}| <button onClick={onSeatmapClickHandler}>seatmap</button></td>
                    </tr>
                </tbody>   
            </table>
            </Card>
            {seatmap && <SeatMap flight={flightDetails} pageName={page}/>}
            {(page==="checkin" && passenger) && <Passenger flight={flightDetails} />}
            </div>
        
    )
}

export default Flightdetails
