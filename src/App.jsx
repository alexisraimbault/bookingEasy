import { hot } from 'react-hot-loader';
import React from 'react';
import './App.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import TimeRangePicker from './components/TimeRangePicker';
import MyDateRangePicker from './components/MyDateRangePicker';
import Timespans from './components/Timespans';
import TypesManager from './components/TypesManager';
import CreationSlider from './components/CreationSlider';

const App = () => (
  <div className="App">
    <CreationSlider />
  </div>
);

export default hot(module)(App);
