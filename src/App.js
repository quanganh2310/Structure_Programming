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


function App() {
  return (
    <div className="mainWrap">
      <Header />
      <MenuBar />
      <Grid
        container
        direction="row"
      >
      <BrowserRouter>
        <div>
         
          <hr />
          <div className="main-route-place">
            <Route exact path="/" component={Main} />
            <Route path="/about" component={DeliveryStatusUpdate} />
            <Route path="/topics" component={DeliveryStatusShow} />
          </div>
        </div>
      </BrowserRouter>
      </Grid>
    </div>
  );
}

export default App;
