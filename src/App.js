import React from 'react';
import './App.css';
import Header from './Header';
import Login from './Login';
import SeatMap from './SeatMap';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Provider} from 'react-redux';
import store from './store/store';
import Inflight from './Inflight';
import Admin from './admin/Admin';
// import Dropdown from './Dropdown';
import Checkin from './Checkin';
import PassengerList from './admin/PassengerList';
import FlightAncillary from './admin/FlightAncillary';
function App() {
  return (
    <Provider store ={store}>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/checkin/seatmap">
              <Header />
              <SeatMap />
            </Route>
            <Route path="/admin/passengerlist">
              <Header />
              <PassengerList />
            </Route>
            <Route path="/admin/ancillarylist">
              <Header />
              <FlightAncillary />
            </Route>
            <Route path="/checkin">
              <Header />
              <Checkin />
            </Route>
            <Route path="/inflight">
              <Header />
              <Inflight />
            </Route>
            
            <Route path="/admin">
              <Header />
              <Admin/>
            </Route>
            <Route path="/">
              <Header />
              <Login />
            </Route>
          
          </Switch>  
        </Router>
      </div>
    </Provider>
  );
}

export default App;
