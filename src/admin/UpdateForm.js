import React,{useState} from 'react';
import './UpdateForm.css';
import {useSelector,  useDispatch} from 'react-redux';
import { updateFlight } from '../store';

function UpdateForm({close,addPassenger,currentFlight,currentPassenger}) {
    const flights = useSelector(state=> state.flights.flights);
    const dispatch = useDispatch();
    const objectHasKeys = (Object.keys(currentPassenger).length)>0?true:false;
    const [firstName,setFirstName] = useState((!addPassenger&&objectHasKeys)?currentPassenger.passportDetails.firstName:"");
    const [lastName, setLastName] = useState((!addPassenger&&objectHasKeys)?currentPassenger.passportDetails.lastName:"");
    const [dateOfBirth, setDateOfBirth] = useState((!addPassenger&&objectHasKeys)?currentPassenger.dob:"");
    const [email, setEmail] = useState((!addPassenger&&objectHasKeys)?currentPassenger.mailId:"");
    const [expiryDate, setExpiryDate] = useState((!addPassenger&&objectHasKeys)?currentPassenger.passportDetails.expiryDate:"");
    const [address, setAddress] = useState((!addPassenger&&objectHasKeys)?currentPassenger.passportDetails.address:"");
    const [passportNo, setPassportNo] = useState((!addPassenger&&objectHasKeys)?currentPassenger.passportDetails.passportNumber:"");
    const [formValidation, setFormValidation] = useState({
        errors:{}
    });
    const handleValidation =()=>{
        let errors={};
        let formIsValid= true;
        // for firstname
        if(firstName===""){
            formIsValid = false;
            errors["firstname"] = "FirstName Cannot be empty";
         }else{
            if(!firstName.match(/^[a-zA-Z]+$/)){
               formIsValid = false;
               errors["firstname"] = "Name should contain Only letters";
            }        
         }
         // for secondname
         if(lastName===""){
            formIsValid = false;
            errors["lastname"] = "lastName Cannot be empty";
         }else{
            if(!lastName.match(/^[a-zA-Z]+$/)){
               formIsValid = false;
               errors["lastname"] = "Name should contain Only letters";
            }        
         }

         // for email
         if(email===""){
            formIsValid = false;
            errors["email"] = "Email Cannot be empty";
         }else{
            let lastAtPos = email.lastIndexOf('@');
            let lastDotPos = email.lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') == -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
               formIsValid = false;
               errors["email"] = "Email is not valid";
             }
        } 
        setFormValidation({errors: errors});
        return formIsValid;
    }


    const formSubmit=(e)=>{
        e.preventDefault();
        if(handleValidation()){
            currentPassenger['name'] = firstName;
            currentPassenger['dob'] = dateOfBirth;
            if(!objectHasKeys){
                currentPassenger['passportDetails']={};
            }
            currentPassenger['passportDetails']['firstName'] = firstName;
            currentPassenger['passportDetails']['lastName'] = lastName;
            currentPassenger['passportDetails']['expiryDate'] = expiryDate;
            currentPassenger['mailId'] = email;
            currentPassenger['passportDetails']['address'] = address;
            currentPassenger['passportDetails']['passportNo'] = passportNo;
            let flightIndex = flights.findIndex(flight=> flight.name === currentFlight.name);
            if(objectHasKeys){
                
                let passengerIndex = flights[flightIndex].passengers.findIndex(passenger =>passenger.id=== currentPassenger.id)
               
                flights[flightIndex].passengers[passengerIndex] = currentPassenger;
            }else{
                let passengerCount = currentFlight.passengers.length;
                currentPassenger['id'] = passengerCount+1;
                currentPassenger['phoneNo'] = null;
                currentPassenger['isCheckedIn'] = false;  
                currentPassenger['seatNO'] = null;
                currentPassenger['ancillary'] = {
                    "infant": false,
                    "wheelChair": false,
                    "vegMeals": false,
                    "nonVegMeals": false,
                    "specialMeals": false
                };
                flights[flightIndex].passengers.push(currentPassenger);
             }
            dispatch(updateFlight(flights));
            setFirstName("");
            setLastName("");
            setDateOfBirth("");
            setEmail("");
            setExpiryDate("");
            setAddress("");
            setPassportNo("");
            setFormValidation({
                errors:{}
            });
            close();
        }
    }

    return (
        <form className="update_form" onSubmit={(e)=>formSubmit(e)}>
            <label htmlFor="firstname">First Name</label>
            <span style={{color: "red"}}>{formValidation.errors["firstname"]}</span> <br/>
            <input 
                type="text" 
                value={firstName}
                onChange ={(e)=>setFirstName(e.target.value)}
            /><br/>
            <label htmlFor="lastname">Last Name</label>
            <span style={{color: "red"}}>{formValidation.errors["lastname"]}</span><br/>
            <input 
                type="text" 
                value={lastName}
                onChange ={(e)=>setLastName(e.target.value)}
            /><br/>
            
            <label htmlFor="dateofbirth">Date Of Birth</label> <br/>
            <input 
                type="date"
                value={dateOfBirth}
                onChange ={(e)=>setDateOfBirth(e.target.value)}
            /><br/>
            <label htmlFor="email">Email ID</label>
            <span style={{color: "red"}}>{formValidation.errors["email"]}</span><br/>
            <input 
                type="email" 
                value={email}
                onChange ={(e)=>setEmail(e.target.value)}
            /><br/>
            
            <label htmlFor="passportNo">Passport Number</label><br/>
            <input 
                type="text"
                value={passportNo}
                onChange ={(e)=>setPassportNo(e.target.value)}
            /><br/>
            <label htmlFor="Expiry Date">Expiry date</label><br/>
            <input 
                type="date"
                value={expiryDate}
                onChange ={(e)=>setExpiryDate(e.target.value)}
            /><br/>
            <label htmlFor="address">Address</label><br/>
            <input 
                type="text" 
                value={address}
                onChange ={(e)=>setAddress(e.target.value)}
            />
            <button onClick={close}>Cancel</button><button type="submit">Confirm</button>
        </form>
    )
}

export default UpdateForm
