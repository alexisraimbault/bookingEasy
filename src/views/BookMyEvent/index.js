import React, { useState, useEffect, useRef } from 'react';
import * as _ from 'lodash';
import axios from 'axios';
import { serverURL } from '../../statics';
import { useHistory } from 'react-router-dom';
import * as moment from 'moment';

import Input from '../../kit/Input';
import ActionButton from '../../kit/ActionButton';
import CalendarWrapper from '../../components/CalendarWrapper';

import { SessionContext } from '../SessionProvider';

import './styles.scss';

const BookMyEvent = ({ props }) => {
    const history = useHistory();
    const availableSpans = useRef([]);
    const [types, setTypes] = useState([]);

    const url = history.location.pathname;
    const urlItemsToNumber = _.map(_.split(url, '/'), _.toNumber);
    const sessionIdIdx = _.findIndex(urlItemsToNumber, item => item !== 0 && !_.isNaN(item) && _.isNumber(item));

    const sessionId = urlItemsToNumber[sessionIdIdx];

    const selectType = typeIdx => {
        const newTypes =_.cloneDeep(types);

        _.each(newTypes, newType => newType.selected=false);
        newTypes[typeIdx].selected =true;

        setTypes(newTypes);
    };

    const selectPotential = potentialIdx => {
        // TODO
    };

    useEffect(() => {
        axios.get(`${serverURL}/session/booking`,{
            params: { id: sessionId },
        })
        .then(res => {
            availableSpans.current = _.get(res, 'data.available', []);
            setTypes(_.map(_.get(res, 'data.types', []), type => _.assign(type, {selected: false})));

        }).catch(err => {
            console.log('ALEXIS err', err);
        });
    }, []);

    const generatePotentials = (spans, type) => {
        console.log('ALEXIS generatePotentials',{spans,type});
        const durationMinutes = _.parseInt(_.get(type, 'duration.minutes', 0)) + (60 *  _.parseInt(_.get(type, 'duration.hours', 0)));

        const potentialsRes = [];
        // V1 : only stack from beginning
        _.each(spans, span => {
            let stackCpt = 1;
            const nbMinutesInSpan = moment(span.to).diff(span.from, 'minutes');

            console.log('ALEXIS nbMinutesInSpan', nbMinutesInSpan);
            console.log('ALEXIS durationMinutes', durationMinutes);
            while(durationMinutes * stackCpt <= nbMinutesInSpan) {
                potentialsRes.push({
                    from: moment(span.from).add(durationMinutes * (stackCpt - 1), 'minutes'),
                    to: moment(span.from).add(durationMinutes * stackCpt, 'minutes')
                });
                
                stackCpt++;
            }
        });

        return potentialsRes;
    };

    const selectedTypeIdx = _.findIndex(types, {selected: true});
    console.log('ALEXIS selectedTypeIdx', selectedTypeIdx);
    const potentials = selectedTypeIdx === -1 ? [] : generatePotentials(availableSpans.current, types[selectedTypeIdx])

    console.log('ALEXIS potentials', potentials);
    return (
        <div>
            { _.map(types, (type, typeIdx) => {

                return (
                    <div 
                            className={`type ${type.selected ? 'type-selected': ''}`}
                            onClick={_.partial(selectType, typeIdx)}
                        >
                            {type.name}
                        </div>
                )
            })}

            { _.map(potentials, (potential, potentialIdx) => {

            return (
                <div 
                    className={`potential`}
                    onClick={_.partial(selectPotential, potentialIdx)}
                >
                    {`${moment(potential.from).format("dddd, MMMM Do YYYY, h:mm a")} - ${moment(potential.to).format("dddd, MMMM Do YYYY, h:mm a")}`}
                </div>
            )
            })}
            <CalendarWrapper
                events={_.map(potentials, potential => _.assign(potential, {
                    start: moment(potential.from).toDate(), 
                    end: moment(potential.to).toDate(),
                    title: 'test',
                }))}
            />
        </div>
    );
}

export default BookMyEvent;