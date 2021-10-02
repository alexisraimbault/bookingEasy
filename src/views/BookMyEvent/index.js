import React, { useState, useEffect, useContext } from 'react';
import * as _ from 'lodash';
import axios from 'axios';
import { serverURL } from '../../statics';
import { useHistory } from 'react-router-dom';

import Input from '../../kit/Input';
import ActionButton from '../../kit/ActionButton';

import { SessionContext } from '../SessionProvider';

import './styles.scss';

const BookMyEvent = ({ props }) => {
    const history = useHistory();

    const sessionId = 4;

    useEffect(() => {
        axios.get(`${serverURL}/session/booking`,{
            params: { id: sessionId },
        })
        .then(res => {
            console.log('ALEXIS res', res);
        }).catch(err => {
            console.log('ALEXIS err', err);
        });
    }, []);

    return (
        <div>
            hello from booking page
        </div>
    )
}

export default BookMyEvent;