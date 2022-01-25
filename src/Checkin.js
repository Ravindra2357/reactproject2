import React,{useState, useEffect} from 'react'
import data from './data/flights';
import Flightdetails from './Flightdetails';
import {useSelector} from 'react-redux';
// import seatmap from './SeatMap';
// import Dropdown from './Dropdown';
import './checkin.css';
import {Card} from "@material-ui/core";
function Checkin() {
    const flights = useSelector(state=>state.flights.flights);
    // console.log(flights11);
    // const flights = data.flights;
    const [seats,setSeats] = useState(0);
    const [flight, setFlight] = useState("select");
    const [flightDetails, setFlightDetails] = useState(null);
    const [showFlightDetail,setShowFlightDetail] = useState(false);
    const onFlightChange =(flightName)=>{
        // console.log(flight_name)
        // if(flightName!="select"){
           flights.map(flight=>{
               if(flight.name==flightName){
                setFlight(flight.name);
                setSeats(flight.seats);
                setFlightDetails(flight);
                setShowFlightDetail(true);
               }
           })
    // }else{
    //     setSeats(0)
    //     setFlightDetails(null)
    // }
    
}
    const wrapperHandler =(e)=>{
        document.querySelector('.custom-select').classList.toggle('open');
        for (const option of document.querySelectorAll(".custom-option")) {
            option.addEventListener('click', function() {
                if (!this.classList.contains('selected') ) {
                    this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
                    this.classList.add('selected');
                    this.closest('.custom-select').querySelector('.custom-select__trigger span').textContent = this.textContent;
                    onFlightChange(this.textContent);
                    
                }
            })
        }
        window.addEventListener('click', function(e) {
            const select = document.querySelector('.custom-select')
            if (!select.contains(e.target)) {
                select.classList.remove('open');
            }
        });
}
    return (
        // <div>
        //     <select class="dropdown"name="flights" id="flights" onChange={onFlightChange} value={flight}>
        //         <option value="select">select</option>
        //         {flights.map(flight=>(<option key={flight.id} value={flight.name}>{flight.name}</option>))}
        //     </select>
        //    {flightDetails&& <Flightdetails flightDetails = {flightDetails}/>}
        // </div>
        <div>
            <div className="custom-select-wrapper" onClick={wrapperHandler}>
                <div className="custom-select">
                    <div className="custom-select__trigger"><span>Select</span>
                      <div className="arrow"></div>
                    </div>
                    <div className="custom-options">
                    <Card>
                    {flights.map(flight=>(
                    
                        <span key={flight.id} className={`custom-option ${flight.id==1 ? 'selected' : ''}`} data-value={flight.name}>{flight.name}</span>
                        ))}
                   
                        {/* <span class="custom-option" data-value="volvo">Volvo</span>
                        <span class="custom-option" data-value="mercedes">Mercedes</span> */}
                    </Card>
                    </div>
                </div>
            </div>
            {flightDetails&& <Flightdetails flightDetails = {flightDetails} page="checkin"/>}
        </div>
        
    )
}

export default Checkin
