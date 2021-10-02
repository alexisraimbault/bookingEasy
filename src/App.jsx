import { hot } from 'react-hot-loader';
import React from 'react';
import './App.scss';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// import TimeRangePicker from './components/TimeRangePicker';
// import MyDateRangePicker from './components/MyDateRangePicker';
// import Timespans from './components/Timespans';
// import TypesManager from './components/TypesManager';
// import CreationSlider from './components/CreationSlider';
import Login from './views/Login';
import MySessions from './views/MySessions';
import CreationSidePanel from './components/CreationSidePanel';
import BookMyEvent from './views/BookMyEvent';
import SessionProvider from './views/SessionProvider';

const App = () => (
  <Router>
    <SessionProvider>
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/list">
            <MySessions />
          </Route>
          <Route path="/session/:sessionId">
            <CreationSidePanel />
          </Route>
          <Route path="/booking/:sessionId">
            <BookMyEvent />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </SessionProvider>
  </Router>
);

export default hot(module)(App);
