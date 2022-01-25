import React,{useState} from 'react';
import './Login.css';
import GoogleLogin from 'react-google-login';
import { useHistory } from "react-router-dom";
import {login,logout} from './store';
import {connect,useSelector,useDispatch} from 'react-redux';
function Login(props) {
    const users = useSelector(state=> state.users.users);
    // const loggedout = useSelector(state=>state.users.loggedInuser)
    // console.log(loggedout);
    const [userName, setUserName] = useState("");
    const  [password, setPassword] = useState("");
    const [error,setError] = useState("");
    const history = useHistory();
    const dispatch = useDispatch();
    const handleGoogleLogin =(response) =>{
        console.log(response);
       localStorage.setItem('isloggedin',true);
       localStorage.setItem('role','staff');
        history.push('/checkin');
    };
    const handleFailure =(response) =>{
        console.log(response);
    };
    const handleLogin =(e)=>{
        e.preventDefault();
       let user = users.find(user=> (user.userName===userName && user.password ===password));
       if(user==undefined){
            setError("User doesn't exist or invalid credentials")
       }else{
        //    dispatch(login({
        //        userName: userName,
        //        role:user.role,
        //        isloggedin: true
        //    }))
           localStorage.setItem('username',userName);
           localStorage.setItem('role',user.role);
           localStorage.setItem('isloggedin',true);
           if(user.role==="admin"){
               history.push('/admin');
           }
           if(user.role ==="staff"){
               history.push('/checkin');
           }
       }
    }
    const handleSubmit = (e)=>{
        // e.preventDefault();
        // props.login({
        //     email: email,
        //     password: password,
        //     isloggedin: true,
        // });
        // if (props.user){
        //     history.push('/seatmap')
        // }else{
        //     alert('please login')
        // }
    };
    return (
        <div className="login">
            <div className="login_container">
            <h1>Sign In</h1>
            <form className="login_form" onSubmit={(e)=> handleSubmit(e)}>
                <span style={{color:"red"}}>{error}</span>
                <h5>Username</h5>
                <input 
                  type="text" 
                  placeholder="username" 
                  value={userName}
                  onChange ={(e)=>setUserName(e.target.value)}
                />
                <h5>Password</h5>
                <input 
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange ={(e)=>setPassword(e.target.value)}
                />
                <button 
                type="submit" className="login_button" onClick={handleLogin}>Login</button>
            </form>
            <div className="sociallogin">
                <GoogleLogin
                clientId="993862558358-29djdhfj2b21usq3ir2vo0rhl9p3vbf4.apps.googleusercontent.com"
                buttonText="Log in with Google"
                onSuccess={handleGoogleLogin}
                onFailure={handleFailure}
                cookiePolicy={'single_host_origin'}
                
            /> 
            </div>
             
            </div>
        {/* {props.user&&<h2>{props.user.email}</h2>} */}
        </div>
        
    )
}
export default Login;
