import React, { Component } from 'react';
import * as _ from 'lodash';
import Slider from 'react-slick';

import MyDateRangePicker from '../MyDateRangePicker';
import Timespans from '../Timespans';
import TypesManager from '../TypesManager';
import ActionButton from '../../kit/ActionButton';
import BasicButton from '../../kit/BasicButton';

import './styles.scss';

const SPEED_CARROUSEL = 500;

class CreationSlider extends Component {
    constructor(props) {
        super(props);
        this.sliderRef = React.createRef();

        this.state = {
            sliderIdx: 0,
            preventChange: false,
        }
    }

    carouselSettings = {
        // centerMode: true,
        dots: false,
        infinite: false,
        swipe: false,
        speed: SPEED_CARROUSEL,
        slidesToShow: 1,
        // centerPadding: '124px',
        // variableWidth: true,
        arrows: false,
        beforeChange: index => {
            this.setState({
                preventChange: true,
            }, () => {
                // in case afterChange doesn't fire
                setTimeout(() => {
                    this.setState({
                        preventChange: false,
                    });
                }, SPEED_CARROUSEL);
            });
        },
        afterChange: index => {
            this.setState({
                preventChange: false,
            });
        },
    };

    arrayToRender = [
        (
            <div className="creation-slider-element" key="slide-element-1">
                <MyDateRangePicker />
            </div>
        ),
        (
            <div className="creation-slider-element" key="slide-element-2">
                <Timespans />
            </div>
        ),
        (
            <div className="creation-slider-element" key="slide-element-3">
                <TypesManager />
            </div>
        ),
    ];

    goToPrev = () => {
        const { sliderIdx, preventChange } = this.state;

        if (preventChange || !this.sliderRef || !this.sliderRef.current || sliderIdx <= 0) {
            return;
        }

        this.sliderRef.current.slickPrev();
        this.setState({ sliderIdx: Math.max(0, sliderIdx - 1) });
    }

    goToNext = () => {
        const { sliderIdx, preventChange } = this.state;

        if (preventChange || !this.sliderRef || !this.sliderRef.current || sliderIdx >= _.size(this.arrayToRender) - 1) {
            return;
        }

        this.sliderRef.current.slickNext();
        this.setState({ sliderIdx: Math.min(_.size(this.arrayToRender) - 1, sliderIdx + 1) });
    }

    render() {
        const { sliderIdx } = this.state;

        return (
            <div className="creation-slider-container">
                <div className="slider-fake-element-container" />
                <Slider
                    ref={this.sliderRef}
                    {...this.carouselSettings}
                    initialSlide={sliderIdx}
                >
                    {this.arrayToRender}
                </Slider>
                <div className="slider-navigation">
                    <div className="button-container">
                        <BasicButton onClick={this.goToPrev} label="Previous" />
                    </div>
                    <div className="button-container">
                        <ActionButton onClick={this.goToNext} label="Next" />
                    </div>
                </div>
            </div>
        );
    }
}

export default CreationSlider;