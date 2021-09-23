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
            types: _.get(props, 'defaultTypes', []),
            isEditing: false,
            editingIdx: -1,
        }
    }

    updateName = idx => name => {
        const { types } = this.state;
        const { bubbleUp } = this.props;

        const tmpTypes = _.cloneDeep(types);
        tmpTypes[idx].name = name;

        bubbleUp(tmpTypes);
        this.setState({ types: tmpTypes });
        
    }

    updateDuration = idx => duration => {
        const { types } = this.state;
        const { bubbleUp } = this.props;

        const tmpTypes = _.cloneDeep(types);
        tmpTypes[idx].duration = duration;

        bubbleUp(tmpTypes);
        this.setState({ types: tmpTypes });
    }

    goToEdit = idx => {
        this.setState({ editingIdx: idx, isEditing: true });
    }

    addType = () => {
        const { types } = this.state;
        const { bubbleUp } = this.props;

        let tmpTypes = _.cloneDeep(types);
        tmpTypes = _.concat(tmpTypes, { name: '', duration: { hours: '0', minutes: '0' } });

        bubbleUp(tmpTypes);
        this.setState({
            types: tmpTypes,
            isEditing: true,
            editingIdx: _.size(tmpTypes) - 1,
        });
    }

    removeType = idx => {
        const { types } = this.state;
        const { bubbleUp } = this.props;

        let tmpTypes = _.cloneDeep(types);
        tmpTypes.splice(idx, 1);

        bubbleUp(tmpTypes);
        this.setState({
            types: tmpTypes,
            isEditing: false,
            editingIdx: - 1,
        });
    }

    validateType = () => {
        if (this.containerRef && this.containerRef.current) {
            this.containerRef.current.style.transform = 'translateY(0%)';
        }

        this.setState({ editingIdx: -1, isEditing: false });
    };

    render() {
        const { types, isEditing, editingIdx } = this.state;

        return (
            <div className="types-manager-container">
                {_.map(types, (type, idx) => idx === editingIdx ? 
                (
                    <div className="type-container">
                        <TypeCreator
                            name={types[editingIdx].name}
                            duration={types[editingIdx].duration}
                            updateDuration={this.updateDuration(editingIdx)}
                            updateName={this.updateName(editingIdx)}
                        />
                        <div onClick={this.validateType}>Save</div>
                    </div>
                ):
                (
                    <div className="type-container">
                        <div className="type-display">{`${type.name} : ${type.duration.hours}h ${type.duration.minutes}mins`}</div>
                        <div onClick={_.partial(this.goToEdit, idx)}>Edit</div>
                        <div onClick={_.partial(this.removeType, idx)}>Remove</div>
                    </div>
                ))}
                <div onClick={this.addType}>Add new</div>
            </div>
        );
    }
}

export default TypesManager;