import React, { useState } from 'react';
import * as _ from 'lodash';
import classNames from 'classnames';

import MyDateRangePicker from '../MyDateRangePicker';
import Timespans from '../Timespans';
import TypesManager from '../TypesManager';
import ActionButton from '../../kit/ActionButton';
import BasicButton from '../../kit/BasicButton';

import './styles.scss';

const CreationSidePanel = ({ props }) => {
  const [currentTab, setCurrentTab] = useState(0);

  const arrayToRender = [
    {
      item: (
        <div className="creation-side-element">
          <MyDateRangePicker />
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
          <Timespans />
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
          <TypesManager />
        </div>
      ),
      label: 'Types de rendez-vous',
      // TODO
      preview: '',
      logo: '',
    },
  ];

  return (
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