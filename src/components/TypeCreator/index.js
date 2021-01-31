import React, { Component } from 'react';

import './styles.scss';

class TypeCreator extends Component {
    constructor(props) {
        super(props);
        this.containerRef = React.createRef();
        
        this.state = { 
            name: props.name || '',
            duration: props.duration || {hours: '0', mins: '0'},
        }
    }

    updateName = event => {
        const { updateName } = this.props;

        updateName && updateName(event.target.value);
        this.setState({name: event.target.value});
    }

    updateHours = event => {
        const { duration: {minutes} } = this.state;
        this.setState({duration: {minutes, hours: event.target.value}}, () => {
            this.updateDuration();
        });
    }

    updateMinutes = event => {
        const { duration: {hours} } = this.state;

        this.setState({duration: {hours, minutes: event.target.value}}, () => {
            this.updateDuration();
        });
    }

    updateDuration = () => {
        const { duration } = this.state;
        const { updateDuration } = this.props;

        updateDuration && updateDuration(duration);
    }

    render() { 
        const { name, duration :{hours, minutes} } = this.props;

        return ( 
            <div className="type-creator-container">
                <input placeHolder="name" value={name} onChange={this.updateName}/>
                <input type="number" min={0} max={10} value={hours} onChange={this.updateHours}/>
                <input type="number" min={0} max={60} value={minutes} onChange={this.updateMinutes}/>
            </div>
        );
    }
}

export default TypeCreator;