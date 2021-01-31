import React, { Component } from 'react';

import './styles.scss';

class MAppearingComponent extends Component {
    constructor(props) {
        super(props);
        this.containerRef = props.containerRef || React.createRef();
        
        this.state = { 
            isToggled: false,
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.toggleAppear();
        }, 100);
    }

    componentWillUnmount() {
        this.toggleDissappear();
    }

    toggleAppear = () => {
        if(!this.containerRef || !this.containerRef.current) {
            return;
        }

        this.containerRef.current.style.transform = 'translateY(100%)';
        this.setState({isToggled: true})
    }

    toggleDissappear = () => {
        if(!this.containerRef || !this.containerRef.current) {
            return;
        }

        this.containerRef.current.style.transform = 'translateY(0%)';
        this.setState({isToggled: false})
    }

    render() { 
        const { color, children } = this.props;

        return ( 
            <div
                className="appearing-component-container"
                ref={this.containerRef}
                style={{backgroundColor: color}}
            >
                {children}
            </div>
        );
    }
}

export default MAppearingComponent;