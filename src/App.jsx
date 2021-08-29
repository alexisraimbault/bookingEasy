import { hot } from 'react-hot-loader';
import React from 'react';
import './App.scss';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import TimeRangePicker from './components/TimeRangePicker';
import MyDateRangePicker from './components/MyDateRangePicker';
import Timespans from './components/Timespans';
import TypesManager from './components/TypesManager';
// import CreationSlider from './components/CreationSlider';
import CreationSidePanel from './components/CreationSidePanel';

const App = () => (
  <div className="App">
    <CreationSidePanel />
  </div>
);

export default hot(module)(App);
