import React, { useState, useEffect, useContext } from 'react';
import * as _ from 'lodash';
import axios from 'axios';
import { serverURL } from '../../statics';
import { useHistory } from 'react-router-dom';

import Input from '../../kit/Input';
import ActionButton from '../../kit/ActionButton';

import { SessionContext } from '../SessionProvider';

import './styles.scss';

const MySessions = ({ props }) => {
    const context = useContext(SessionContext);
    const contextData = _.get(context, 'contextObject');
    // const updateFunctions = _.get(context, 'updateFunctions');
    const history = useHistory();

    const [mySessions, setMySessions] = useState([]);

    const session = _.get(contextData, 'session');

    useEffect(() => {
        axios.defaults.headers.common['authorization'] = _.get(session, 'token');
        axios.get(`${serverURL}/session/list`)
        .then(listRes => {
            if (listRes.status === 200){
                setMySessions(_.get(listRes, 'data.sessions', []));
            }
        });
    }, []);

    const goToSession = sessionId => () => {
        history.push(`session/${sessionId}`, {sessionId});
    }

    return (
        <div>
            {_.isEmpty(mySessions) && 'HELLO FROM MY SESSIONS'}
            {!_.isEmpty(mySessions) && (
                <div>
                    {_.map(mySessions, (mySession, sessionIdx) => {

                        return (
                            <div 
                                key={`session-${sessionIdx}`}
                                onClick={goToSession(mySession.id)}
                            >
                                {mySession.name}
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default MySessions;