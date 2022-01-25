import React from 'react';
import {useSelector} from 'react-redux';
import {Card, CardContent} from "@material-ui/core";
import {Link} from 'react-router-dom';
import './Admin.css';
// import MUIDataTable from "mui-datatables";
function Admin() {
    const flights = useSelector(state=>state.flights.flights);
    // const loggedInUser = useSelector(state=>state.users.loggedInuser);
    // console.log(loggedInUser);
    // const columns = ["Flight Id", "Flight Name", "Departure", "Arrival", "Seats"];
    // const data=[];
    // flights.map((flight)=>{
    //     const flightdata =[];
    //     flightdata.push(flight.id);
    //     flightdata.push(flight.name);
    //     flightdata.push(flight.departure);
    //     flightdata.push(flight.arrival);
    //     flightdata.push(flight.seats);
    //     data.push(flightdata);
    // });
    const options = {
        filter:false,
        sort:false
    }
    return (
    //     <MUIDataTable
    //     title={"Airplane List"}
    //     data={data}
    //     columns={columns}
    //     options={options}
    //   />
    
    <Card className="admin_dashboard">
    <CardContent className="table_content">
        <table className="airline_list">
            <thead className="table_header">
                <tr>
                    <th>Flight ID</th>
                    <th>Flight Name</th>
                    <th>Departure</th>
                    <th>Arrival</th>
                    <th>Seats</th>
                    <th>Services</th>
                </tr>
            </thead>
            <tbody className="table_body">
            {
                flights.map((flight)=>(
                    <tr key={flight.id} className="table_row">
                        <td>{flight.id}</td>
                        <td>{flight.name}</td>
                        <td>{flight.departure}</td>
                        <td>{flight.arrival}</td>
                        <td>{flight.seats}</td>
                        <td className="services">
                            <Link  to={{
                                        pathname: "/admin/passengerlist",
                                        search: `?flightName=${flight.name}`
                                        }}
                                        className="service_link">
                                            Passengers
                            </Link>|<span><Link to={{
                                            pathname:"/admin/ancillarylist",
                                            search: `?flightName=${flight.name}`
                                         }}
                                             className="service_link">Ancillary Services
                                         </Link></span>
                        </td>
                    </tr> 
                ))}
            </tbody>
        </table>
        
    </CardContent>
    </Card>
    )
}

export default Admin
