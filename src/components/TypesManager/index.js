import React, { Component } from 'react';
import * as _ from 'lodash';

import TypeCreator from '../TypeCreator';
import MAppearingComponent from '../MAppearingComponent';

import './styles.scss';

class TypesManager extends Component {
    constructor(props) {
        super(props);
        this.containerRef = React.createRef();
        
        this.state = { 
            types: [],
            isEditing: false,
            editingIdx: -1,
        }
    }

    updateName = idx => name => {
        const { types } = this.state;

        const tmpTypes = _.cloneDeep(types);
        tmpTypes[idx].name = name;

        this.setState({types: tmpTypes});
    }

    updateDuration = idx => duration => {
        const { types } = this.state;

        const tmpTypes = _.cloneDeep(types);
        tmpTypes[idx].duration = duration;

        this.setState({types: tmpTypes});
    }

    goToEdit = idx => {
        this.setState({editingIdx: idx, isEditing: true});
    }

    addType = () => {
        const { types } = this.state;

        let tmpTypes = _.cloneDeep(types);
        tmpTypes = _.concat(tmpTypes, {name: '', duration: {hours: '0', minutes: '0'}});

        this.setState({
            types: tmpTypes,
            isEditing: true,
            editingIdx: _.size(tmpTypes) - 1,
        });
    }

    validateType = () => {
        if(this.containerRef && this.containerRef.current) {
            this.containerRef.current.style.transform = 'translateY(0%)';
        }
        
        setTimeout(() => {
            this.setState({editingIdx: -1, isEditing: false});
        }, 300);
    };

    render() { 
        const { types, isEditing, editingIdx } = this.state;

        return ( 
            <div className="types-manager-container">
                {_.map(types, (type, idx) => (
                    <>
                        <div className="type-display">{`${type.name} : ${type.duration.hours}h ${type.duration.minutes}mins`}</div>
                        <div onClick={_.partial(this.goToEdit, idx)}>Edit</div>
                    </>
                ))}
                <div onClick={this.addType}>Add new</div>
                {isEditing && (
                    <MAppearingComponent
                        color="lightcoral"
                        containerRef={this.containerRef}
                    >
                        <TypeCreator 
                            name={types[editingIdx].name}
                            duration={types[editingIdx].duration}
                            updateDuration={this.updateDuration(editingIdx)}
                            updateName={this.updateName(editingIdx)}
                        />
                        <div onClick={this.validateType}>Save</div>
                    </MAppearingComponent>
                )}
            </div>
        );
    }
}

export default TypesManager;