import React,{useState} from 'react';
import './Header.css';
import {Link} from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux';
import { logout } from './store';
function Header() {
    const isLoggedin= localStorage.getItem('isloggedin');
    const userRole = localStorage.getItem('role');
    // const dispatch = useDispatch();
    const onLogout = () =>{
        // dispatch(logout({
        //     userName: null,
        //     userRole:null,
        //     isLoggedin: false
        // }))
        localStorage.clear();
    }
    return (
        <nav className="header">
            <div className="header_left">
                Airline Project
           </div>
           <div className="header_nav">
               {
                (isLoggedin&&userRole==="staff")&&
                <Link to="/inflight" className="header_link">
                    <div className="header_option">
                        IN-FLIGHT
                    </div>
                </Link>
               } 
               {
                (isLoggedin&&userRole==="staff")&&
                <Link to="/checkin" className="header_link">
                    <div className="header_option">
                       checkIn
                    </div>
                </Link>}
                {
                (isLoggedin&&userRole==="admin")&&
                <Link to="/admin" className="header_link">
                    <div className="header_option">
                       admin
                    </div>
                </Link>}
                {
                isLoggedin&&
                <Link to="/"  className="header_link" onClick={onLogout}>
                    <div className="header_option">
                       Logout
                    </div>
                </Link>}
                {
                !isLoggedin&&
                <Link to="/"  className="header_link" >
                    <div className="header_option">
                       Login
                    </div>
                </Link> }
           </div>
        </nav>
    )
}

export default Header
