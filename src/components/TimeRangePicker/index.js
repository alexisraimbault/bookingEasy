import React, { Component } from 'react';
import * as _ from 'lodash';

import './styles.scss';

class TimeRangePicker extends Component {
    constructor(props) {
        super(props);
        this.rangeRef = React.createRef();
        this.minRef = React.createRef();
        this.maxRef = React.createRef();

        this.state = {
            from: props.from,
            to: props.to,
            displayFromHours: -1,
            displayToHours: -1,
            displayToMinutes: -1,
            displayFromMinutes: -1,
        };
    }

    componentDidMount() {
        const { setUpdateCSSFunction } = this.props;

        this.updateCSS();
        setUpdateCSSFunction && setUpdateCSSFunction(this.updateCSS);
        // this.props.updateRanges && this.props.updateRanges({from, to});
    }

    componentDidUpdate(prevProps) {
        // Utilisation classique (pensez bien à comparer les props) :
        if (this.props.size !== prevProps.size) {
            this.props.setUpdateCSSFunction(this.updateCSS);
            this.updateCSS();
        }
    }

    // from 06 : 00 to 20 : 00
    normalizeToTime = percent => {
        const time = percent * 14 / 100;
        return {
            hours: 6 + Math.trunc(time),
            minutes: Math.trunc((time%1) * 60),
        }
    }

    normalizeToPercent = time => {
        const { hours, minutes } = time;
        const totalMinutes = 60 * 14;
        const currentMinutes = ((hours - 6) * 60 ) + minutes;
        return Math.round(currentMinutes * 100 / totalMinutes);
    }

    // if 32 -> 30
    flattenTime = time => {
        const { hours, minutes } = time;
        
        const newMins = (minutes % 30 <= 8 || minutes % 30 >= 22) ? Math.round(minutes/30) * 30 : minutes;
        return {
            hours: newMins === 60 ? hours + 1 : hours,
            minutes: newMins === 60 ? 0 : newMins,
        }
    }

    setMin = event => {
        const { to, from } = this.state;
        const eventTime = this.flattenTime(this.normalizeToTime(_.parseInt(event.target.value)));
        const toValue = this.normalizeToPercent(to);

        this.setState({from: toValue < _.parseInt(event.target.value) ? to : eventTime}, () => {
            this.updateCSS();
            this.props.updateRanges && this.props.updateRanges({from, to});
        });
    }

    setMax = event => {
        const { from, to } = this.state;
        const eventTime = this.flattenTime(this.normalizeToTime(_.parseInt(event.target.value)));
        const fromValue = this.normalizeToPercent(from);

        this.props.updateRanges && this.props.updateRanges({from, to: fromValue > _.parseInt(event.target.value) ? from : eventTime});
        this.setState({to: fromValue > _.parseInt(event.target.value) ? from : eventTime}, () => {
            this.updateCSS();
        });
    }

    setFromHours = event => {
        if (_.isEmpty(event.target.value)) {
            this.setState({displayFromHours: ''});
            return;
        }

        if(_.parseInt(event.target.value) === 1) {
            this.setState({displayFromHours: '1'});
            return;
        }

        const { from, to } = this.state;
        const toValue = this.normalizeToPercent(to);
        const newFrom = _.assign({}, from, {hours: _.isEmpty(event.target.value) ? 0 : Math.min(20, Math.max(6, _.parseInt(event.target.value)))});
        const newFromValue = this.normalizeToPercent(newFrom);

        this.props.updateRanges && this.props.updateRanges({from: newFrom, to: toValue > newFromValue ? to : newFrom });
        this.setState({from: newFrom, to: toValue > newFromValue ? to : newFrom, displayFromHours: -1 }, () => {
            this.updateCSS();
        });
    }

    setFromMinutes = event => {
        if (_.isEmpty(event.target.value)) {
            this.setState({displayFromMinutes: ''});
            return;
        }
        
        const { from, to } = this.state;
        const toValue = this.normalizeToPercent(to);
        const newFrom = _.assign({}, from, {minutes: _.isEmpty(event.target.value) ? 0 :Math.min(60, Math.max(0, _.parseInt(event.target.value)))});
        const newFromValue = this.normalizeToPercent(newFrom);

        this.props.updateRanges && this.props.updateRanges({from: newFrom, to: toValue > newFromValue ? to : newFrom });
        this.setState({from: newFrom, to: toValue > newFromValue ? to : newFrom, displayFromMinutes: -1 }, () => {
            this.updateCSS();
        });
    }

    setToHours = event => {
        if (_.isEmpty(event.target.value)) {
            this.setState({displayToHours: ''});
            return;
        }
        
        if(_.parseInt(event.target.value) === 1) {
            this.setState({displayToHours: '1'});
            return;
        }

        const { from, to } = this.state;
        const fromValue = this.normalizeToPercent(from);
        const newTo = _.assign({}, to, {hours: _.isEmpty(event.target.value) ? 0 : Math.min(20, Math.max(6, _.parseInt(event.target.value)))});
        const newToValue = this.normalizeToPercent(newTo);

        this.props.updateRanges && this.props.updateRanges({from: fromValue < newToValue ? from : newTo, to: newTo});
        this.setState({from: fromValue < newToValue ? from : newTo, to: newTo, displayToHours: -1 }, () => {
            this.updateCSS();
        });
    }

    setToMinutes = event => {
        if (_.isEmpty(event.target.value)) {
            this.setState({displayToMinutes: ''});
            return;
        }
        
        const { from, to } = this.state;
        const fromValue = this.normalizeToPercent(from);
        const newTo = _.assign({}, to, {minutes: _.isEmpty(event.target.value) ? 0 : Math.min(60, Math.max(0, _.parseInt(event.target.value)))});
        const newToValue = this.normalizeToPercent(newTo);

        this.props.updateRanges && this.props.updateRanges({from: fromValue < newToValue ? from : newTo, to: newTo});
        this.setState({from: fromValue < newToValue ? from : newTo, to: newTo, displayToMinutes: -1 }, () => {
            this.updateCSS();
        });
    }

    updateCSS = () => {
        const { from, to } = this.props;

        if(_.isNil(from) || _.isNil(to)) {
            return ;
        }

        const fromTime = this.normalizeToPercent(from);
        const toTime = this.normalizeToPercent(to);
        
        this.rangeRef.current.style.left = `${fromTime}%`;
        this.rangeRef.current.style.right = `${100 - toTime}%`;
        this.minRef.current.style.left = `${fromTime}%`;
        this.maxRef.current.style.right = `${100 - toTime}%`;
    }

    render() {
        const { from, to, displayFromHours, displayToHours, displayFromMinutes, displayToMinutes, setFromHours, setFromMinutes, setToHours, setToMinutes, setMin, setMax } = this.props;

        if(_.isNil(from) || _.isNil(to)) {
            return <></>;
        }
        const fromTime = this.normalizeToPercent(from);
        const toTime = this.normalizeToPercent(to);

        return (
            <div className="time-range-picker">
                <div className="display">
                    <div className="time">
                        <input type="number" min={6} max={20} value={displayFromHours !== -1 ? displayFromHours : from.hours} onChange={setFromHours}/>
                        :
                        <input type="number" min={0} max={60} value={displayFromMinutes !== -1 ? displayFromMinutes : from.minutes} onChange={setFromMinutes}/>
                    </div>
                    <span>&#8594;</span>
                    <div className="time">
                        <input type="number" min={6} max={20} value={displayToHours !== -1 ? displayToHours : to.hours} onChange={setToHours}/>
                        :
                        <input type="number" min={0} max={60} value={displayToMinutes !== -1 ? displayToMinutes : to.minutes} onChange={setToMinutes}/>
                    </div>
                    </div>
                <input type="range" min={0} max={100} value={fromTime} onChange={this.setMin}/>
                <input type="range" min={0} max={100} value={toTime} onChange={this.setMax}/>
                <div className="slider">
                    <div className="track"/>
                    <div className="range" ref={this.rangeRef}/>
                    <div className="thumb left" ref={this.minRef}/>
                    <div className="thumb right" ref={this.maxRef}/>
                </div>
            </div>
        );
    }
}

export default TimeRangePicker;