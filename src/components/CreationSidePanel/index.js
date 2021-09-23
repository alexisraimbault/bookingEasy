import React, { useState, useContext, useEffect } from 'react';
import * as _ from 'lodash';
import classNames from 'classnames';
import axios from 'axios';
import { serverURL } from '../../statics';
import { useHistory } from 'react-router-dom';
import * as moment from 'moment';

import MyDateRangePicker from '../MyDateRangePicker';
import Timespans from '../Timespans';
import TypesManager from '../TypesManager';
import ActionButton from '../../kit/ActionButton';
import BasicButton from '../../kit/BasicButton';

import { SessionContext } from '../../views/SessionProvider';

import './styles.scss';

const CreationSidePanel = ({ props }) => {
  const context = useContext(SessionContext);
  const contextData = _.get(context, 'contextObject');
  // const updateFunctions = _.get(context, 'updateFunctions');
  const history = useHistory();
  const sessionId = _.get(history, 'location.state.sessionId');

  const session = _.get(contextData, 'session');

  const [sessionDetails, setSessionDetails] = useState({});
  const [isLoading, setisLoading] = useState(true);

  const updateDates = () => dates => {
    const newSessionDetails = _.cloneDeep(sessionDetails);
    newSessionDetails.settings = _.assign(
      _.isNil(newSessionDetails.settings) ? {} : newSessionDetails.settings, 
      {from: moment(dates.from).format(), to: moment(dates.to).format()}
    );

    setSessionDetails(newSessionDetails);
  }

  const updateRanges = () => ranges => {
    const newSessionDetails = _.cloneDeep(sessionDetails);
    newSessionDetails.settings = _.assign(
      _.isNil(newSessionDetails.settings) ? {} : newSessionDetails.settings, 
      {ranges}
    );

    setSessionDetails(newSessionDetails);
  }

  const updateTypes = () => types => {
    const newSessionDetails = _.cloneDeep(sessionDetails);
    newSessionDetails.types = _.assign(
      _.isNil(newSessionDetails.settings) ? {} : newSessionDetails.settings, 
      {types}
    );

    setSessionDetails(newSessionDetails);
  }

  useEffect(() => {
      axios.defaults.headers.common['authorization'] = _.get(session, 'token');
      axios.get(`${serverURL}/session/details`, {
        params: { id: sessionId },
    })
      .then(sessionRes => {
          if (sessionRes.status === 200){
            setSessionDetails(_.get(sessionRes, 'data.session', {}));
          }
          if (listRes.status === 403){
              localStorage.removeItem('session');
              history.push('login');
          }
          setisLoading(false);
      }).catch(e => {
        setisLoading(false);
      });
  }, []);

  const saveSettingsInAPI = () => {
    axios.defaults.headers.common['authorization'] = _.get(session, 'token');
    axios.put(`${serverURL}/session`, {
      id: sessionId,
      settings: sessionDetails.settings,
    })
  }

  const [currentTab, setCurrentTab] = useState(0);
  
  useEffect(() => {
    if(isLoading) {
      return;
    }

    saveSettingsInAPI();
  }, [currentTab])

  const arrayToRender = [
    {
      item: (
        <div className="creation-side-element">
          <MyDateRangePicker
            bubbleUp={updateDates()}
            defaultDates={{from: _.get(sessionDetails, 'settings.from', null), to: _.get(sessionDetails, 'settings.to', null)}}
          />
        </div>
      ),
      label: 'Dates',
      // TODO
      preview: '',
      logo: '',
    },
    {
      item: (
        <div className="creation-side-element">
          <Timespans
            bubbleUp={updateRanges()}
            defaultRanges={_.get(sessionDetails, 'settings.ranges', [])}
           />
        </div>
      ),
      label: 'Horaires',
      // TODO
      preview: '',
      logo: '',
    },
    {
      item: (
        <div className="creation-side-element">
          <TypesManager
            bubbleUp={updateTypes()}
            defaultTypes={_.get(sessionDetails, 'settings.types', [])}
          />
        </div>
      ),
      label: 'Types de rendez-vous',
      // TODO
      preview: '',
      logo: '',
    },
  ];

  return isLoading ? <></> :
  (
    <div className="creation-side-panel__wrapper">
    <div className="creation-side-panel__container">
      <div className="creation-side-panel__left">
        {_.map(arrayToRender, (itemToRender, index) => {
          const sideItemContainerClassNames = classNames({
            'creation-side-panel__side-item-container': true,
            'creation-side-panel__side-item-container--selected': index === currentTab,
          });

          return (
          <div className={sideItemContainerClassNames} onClick={_.partial(setCurrentTab, index)}>
            <div className="creation-side-panel__side-item-top-container">
              <div className="creation-side-panel__side-item-index">{index + 1}</div>
              <div className="creation-side-panel__side-item-label">{itemToRender.label}</div>
            </div>
            <div className="creation-side-panel__side-item-preview">{itemToRender.preview}</div>
          </div>
        );
        })}
        <div className="creation-side-panel__left-filler" />
      </div>
      <div className="creation-side-panel__inner">
        {arrayToRender[currentTab].item}
      </div>
      </div>
    </div>
  )
};

export default CreationSidePanel;