import React, { useState } from 'react';
import * as _ from 'lodash';
import classNames from 'classnames';

import './styles.scss';

const Input = ({ value, onChange, placeholder, isDisabled }) => {

    return (
        <input
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={isDisabled}
        />
    )
}

export default Input;