import React from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import {Grid} from '@material-ui/core'
import Header from './components/Header/Header'
import MenuBar from './components/MenuBar/MenuBar'
import LeftBar from './components/LeftBar/LeftBar'
import Main from './components/Content/Main'
import DeliveryStatusUpdate from './components/StatusUpdate/DeliveryStatusUpdate'
import DeliveryStatusShow from './components/StatusShow/DeliveryStatusShow'
import DetailUnit from './components/DetailUnit/DetailUnit'


function App() {
  return (
    <div >
      
      <BrowserRouter>
        <Header />
        <MenuBar />
        
        <Route exact path="/" component={DeliveryStatusUpdate} />
        <Route path="/delivery_units" component={Main} />
        <Route path="/deliveries" component={DeliveryStatusUpdate} />
        <Route path="/detail_unit" component={DetailUnit}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
