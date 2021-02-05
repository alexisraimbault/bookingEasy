import React, { Component } from 'react';
import * as _ from 'lodash';

import './styles.scss';

import TimeRangePicker from '../TimeRangePicker';

class Timespans extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ranges: [
                {
                    from: {
                        hours: 8,
                        minutes: 0,
                    },
                    to: {
                        hours: 12,
                        minutes: 0,
                    },
                    displayFromHours: -1,
                    displayToHours: -1,
                    displayToMinutes: -1,
                    displayFromMinutes: -1,
                    updateCSS: () => { },
                    shouldUpdateCSS: 0,
                }
            ],
        }
    }

    updateRange = idx => ({ from, to }, callbackFunction = () => { }) => {
        const { ranges } = this.state;

        const tmpRanges = _.cloneDeep(ranges);
        tmpRanges[idx].from = from;
        tmpRanges[idx].to = to;

        this.setState({ ranges: tmpRanges }, () => {
            callbackFunction && callbackFunction();
        });
    }

    addRange = () => {
        const { ranges } = this.state;

        let tmpRanges = _.cloneDeep(ranges);
        tmpRanges = _.concat(tmpRanges, {
            from: {
                hours: 8,
                minutes: 0,
            },
            to: {
                hours: 12,
                minutes: 0,
            },
            displayFromHours: -1,
            displayToHours: -1,
            displayToMinutes: -1,
            displayFromMinutes: -1,
            updateCSS: () => { },
            shouldUpdateCSS: 0,
        });

        this.setState({ ranges: tmpRanges });
    }

    removeRange = idx => {
        const { ranges } = this.state;

        let tmpRanges = _.cloneDeep(ranges);
        tmpRanges.splice(idx, 1);

        this.setState({ ranges: tmpRanges }, () => {
            // _.each(tmpRanges, range => {
            //     range.updateCSS();
            // })
        });
    }

    // from 06 : 00 to 20 : 00
    normalizeToTime = percent => {
        const time = percent * 14 / 100;
        return {
            hours: 6 + Math.trunc(time),
            minutes: Math.trunc((time % 1) * 60),
        }
    }

    normalizeToPercent = time => {
        const { hours, minutes } = time;

        const totalMinutes = 60 * 14;
        const currentMinutes = ((hours - 6) * 60) + minutes;
        return Math.round(currentMinutes * 100 / totalMinutes);
    }

    // if 32 -> 30
    flattenTime = time => {
        const { hours, minutes } = time;

        const newMins = (minutes % 30 <= 8 || minutes % 30 >= 22) ? Math.round(minutes / 30) * 30 : minutes;
        return {
            hours: newMins === 60 ? hours + 1 : hours,
            minutes: newMins === 60 ? 0 : newMins,
        }
    }

    updateIdxParams = (idx, params) => {
        const { ranges } = this.state;

        const tmpRanges = _.cloneDeep(ranges);
        tmpRanges[idx].from = from;
        tmpRanges[idx].to = to;
    }

    setMin = idx => event => {
        const { ranges } = this.state;
        const { from, to } = ranges[idx];

        const eventTime = this.flattenTime(this.normalizeToTime(_.parseInt(event.target.value)));
        const toValue = this.normalizeToPercent(to);

        const tmpRanges = _.cloneDeep(ranges);
        tmpRanges[idx].from = toValue < _.parseInt(event.target.value) ? to : eventTime;
        this.setState({ ranges: tmpRanges }, () => {
            tmpRanges[idx].updateCSS();
        });
    }

    setMax = idx => event => {
        const { ranges } = this.state;
        const { from, to } = ranges[idx];

        const eventTime = this.flattenTime(this.normalizeToTime(_.parseInt(event.target.value)));
        const fromValue = this.normalizeToPercent(from);

        const tmpRanges = _.cloneDeep(ranges);
        tmpRanges[idx].to = fromValue > _.parseInt(event.target.value) ? from : eventTime;
        this.setState({ ranges: tmpRanges }, () => {
            tmpRanges[idx].updateCSS();
        });
    }

    setFromHours = idx => event => {
        const { ranges } = this.state;
        const tmpRanges = _.cloneDeep(ranges);

        if (_.isEmpty(event.target.value)) {
            tmpRanges[idx].displayFromHours = '';
            this.setState({ ranges: tmpRanges }, () => {
                tmpRanges[idx].updateCSS();
            });
            return;
        }

        if (_.parseInt(event.target.value) === 1) {
            tmpRanges[idx].displayFromHours = '1';
            this.setState({ ranges: tmpRanges }, () => {
                tmpRanges[idx].updateCSS();
            });
            return;
        }

        const { from, to } = ranges[idx];

        const toValue = this.normalizeToPercent(to);
        const newFrom = _.assign({}, from, { hours: _.isEmpty(event.target.value) ? 0 : Math.min(20, Math.max(6, _.parseInt(event.target.value))) });
        const newFromValue = this.normalizeToPercent(newFrom);


        tmpRanges[idx].displayFromHours = -1;
        tmpRanges[idx].from = newFrom;
        tmpRanges[idx].to = toValue > newFromValue ? to : newFrom;
        this.setState({ ranges: tmpRanges }, () => {
            tmpRanges[idx].updateCSS();
        });
    }

    setFromMinutes = idx => event => {
        const { ranges } = this.state;
        const tmpRanges = _.cloneDeep(ranges);

        if (_.isEmpty(event.target.value)) {
            tmpRanges[idx].displayFromMinutes = '';
            this.setState({ ranges: tmpRanges }, () => {
                tmpRanges[idx].updateCSS();
            });
            return;
        }

        const { from, to } = ranges[idx];

        const toValue = this.normalizeToPercent(to);
        const newFrom = _.assign({}, from, { minutes: _.isEmpty(event.target.value) ? 0 : Math.min(60, Math.max(0, _.parseInt(event.target.value))) });
        const newFromValue = this.normalizeToPercent(newFrom);

        tmpRanges[idx].from = newFrom;
        tmpRanges[idx].to = toValue > newFromValue ? to : newFrom;
        tmpRanges[idx].displayFromMinutes = -1;
        this.setState({ ranges: tmpRanges }, () => {
            tmpRanges[idx].updateCSS();
        });
    }

    setToHours = idx => event => {
        const { ranges } = this.state;
        const tmpRanges = _.cloneDeep(ranges);

        if (_.isEmpty(event.target.value)) {
            tmpRanges[idx].displayToHours = '';
            this.setState({ ranges: tmpRanges }, () => {
                tmpRanges[idx].updateCSS();
            });
            return;
        }

        if (_.parseInt(event.target.value) === 1) {
            tmpRanges[idx].displayToHours = '1';
            this.setState({ ranges: tmpRanges }, () => {
                tmpRanges[idx].updateCSS();
            });
            return;
        }

        const { from, to } = ranges[idx];

        const fromValue = this.normalizeToPercent(from);
        const newTo = _.assign({}, to, { hours: _.isEmpty(event.target.value) ? 0 : Math.min(20, Math.max(6, _.parseInt(event.target.value))) });
        const newToValue = this.normalizeToPercent(newTo);

        tmpRanges[idx].from = fromValue < newToValue ? from : newTo;
        tmpRanges[idx].to = newTo;
        tmpRanges[idx].displayToHours = -1;
        this.setState({ ranges: tmpRanges }, () => {
            tmpRanges[idx].updateCSS();
        });
    }

    setToMinutes = idx => event => {
        const { ranges } = this.state;
        const tmpRanges = _.cloneDeep(ranges);

        if (_.isEmpty(event.target.value)) {
            tmpRanges[idx].displayToMinutes = '';
            this.setState({ ranges: tmpRanges }, () => {
                tmpRanges[idx].updateCSS();
            });
            return;
        }

        const { from, to } = ranges[idx];

        const fromValue = this.normalizeToPercent(from);
        const newTo = _.assign({}, to, { minutes: _.isEmpty(event.target.value) ? 0 : Math.min(60, Math.max(0, _.parseInt(event.target.value))) });
        const newToValue = this.normalizeToPercent(newTo);

        tmpRanges[idx].from = fromValue < newToValue ? from : newTo;
        tmpRanges[idx].to = newTo;
        tmpRanges[idx].displayToMinutes = -1;
        this.setState({ ranges: tmpRanges }, () => {
            tmpRanges[idx].updateCSS();
        });
    }

    setUpdateCSSFunction = idx => updateCSSFunction => {
        const { ranges } = this.state;
        const tmpRanges = _.cloneDeep(ranges);

        tmpRanges[idx].updateCSS = updateCSSFunction;

        if (idx > 0) {
            tmpRanges[idx - 1].shouldUpdateCSS += 1;
        }
        this.setState({ ranges: tmpRanges });
    }

    render() {
        const { ranges } = this.state;

        const nbRanges = _.size(ranges);

        return (
            <div>
                {_.map(ranges, (range, idx) => {
                    return (
                        <>
                            <TimeRangePicker
                                updateRanges={this.updateRange(idx)}
                                key={`range-picker-${idx}`}
                                idx={idx}
                                size={nbRanges + _.get(range, 'shouldUpdateCSS', 0)}
                                from={range.from}
                                to={range.to}
                                setFromHours={this.setFromHours(idx)}
                                setFromMinutes={this.setFromMinutes(idx)}
                                setToHours={this.setToHours(idx)}
                                setToMinutes={this.setToMinutes(idx)}
                                setMin={this.setMin(idx)}
                                setMax={this.setMax(idx)}
                                setUpdateCSSFunction={this.setUpdateCSSFunction(idx)}
                                displayFromHours={range.displayFromHours}
                                displayToHours={range.displayToHours}
                                displayToMinutes={range.displayToMinutes}
                                displayFromMinutes={range.displayFromMinutes}
                            />
                            <div onClick={_.partial(this.removeRange, idx)}>remove range</div>
                        </>)
                }
                )}
                <div onClick={this.addRange}>add range</div>
            </div>
        );
    }
}

export default Timespans;