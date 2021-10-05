import React, { useState, useEffect, useRef } from 'react';
import * as _ from 'lodash';
import axios from 'axios';
import * as moment from 'moment';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from "@fullcalendar/timegrid";

import Input from '../../kit/Input';
import ActionButton from '../../kit/ActionButton';

import './styles.scss';

const CalendarWrapper = ({ events, customRender }) => {
    return (
        <div>
            <FullCalendar
                plugins={[ dayGridPlugin, listPlugin, interactionPlugin, timeGridPlugin ]}
                initialView="timeGridWeek"
                events={events}
                // eventContent={customRender}
            />
        </div>
    );
}

export default CalendarWrapper;