import React, { Component } from 'react';
import * as _ from 'lodash';
import * as moment from 'moment';
import { DateRangePicker } from 'react-dates';

import './styles.scss';

class MyDateRangePicker extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            from: null,
            to: null,
        }
    }

    updateDates = ({startDate: from, endDate: to}) => this.setState({from, to});

    render() { 
        const { from, to } = this.state;
        const { key } = this.props;

        return ( 
            <DateRangePicker
                startDate={from ? moment(from) : null} // momentPropTypes.momentObj or null,
                startDateId={`start-${key}` || 'start-cle'} // PropTypes.string.isRequired,
                endDate={to ? moment(to) : null} // momentPropTypes.momentObj or null,
                endDateId={`end-${key}` || 'end-cle'} // PropTypes.string.isRequired,
                onDatesChange={this.updateDates} // PropTypes.func.isRequired,
                focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
            />
        );
    }
}

export default MyDateRangePicker;