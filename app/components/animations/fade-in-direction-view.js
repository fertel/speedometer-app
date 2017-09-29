import React, { Component } from 'react';

import { Animated } from 'react-native';
import PropTypes from 'prop-types';
import { Variables } from '../../assets/styles/variables';

const MOVEMENT_VALUE = 100;

export const DIRECTIONS = {
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3
};

export class FadeInDirectionView extends Component {

    constructor(props) {
        super(props);

        this.animate = this.animate.bind(this);
        this.createOutputRangeStartValue = this.createOutputRangeStartValue.bind(this);
        this.getTransform = this.getTransform.bind(this);
    }

    componentWillMount() {
        this.animation = new Animated.Value(0);
    }

    componentDidMount() {
        this.animate();
    }

    componentDidUpdate() {
        const { animateOnUpdate } = this.props;
        if (animateOnUpdate) this.animate();
    }

    animate() {
        const { animate, delay, duration } = this.props;

        if (!animate) return;

        this.animation.setValue(0);

        Animated.timing(this.animation, {
            delay: delay,
            duration: duration,
            easing: Variables.animations.defaultEasing,
            toValue: 1,
            useNativeDriver: true
        }).start();
    }

    createOutputRangeStartValue(direction) {
        switch (direction) {
            case DIRECTIONS.UP: return MOVEMENT_VALUE;
            case DIRECTIONS.DOWN: return -MOVEMENT_VALUE;
            case DIRECTIONS.LEFT: return MOVEMENT_VALUE;
            case DIRECTIONS.RIGHT: return -MOVEMENT_VALUE;

            default: return DIRECTIONS.UP;
        }
    }

    getTransform() {
        const { direction } = this.props;

        const interpolatedAnimation = this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [this.createOutputRangeStartValue(direction), 0]
        });

        const transform = [
            direction > 1
                ? { translateX: interpolatedAnimation }
                : { translateY: interpolatedAnimation }
        ];

        return { transform };
    }

    render() {
        const { children, style } = this.props;

        return(
            <Animated.View style={[
                style,
                this.getTransform(),
                { opacity: this.animation }
            ]}>
                {children}
            </Animated.View>
        );
    }
}

FadeInDirectionView.defaultProps = {
    animate: true,
    animateOnUpdate: false,
    delay: 0,
    direction: DIRECTIONS.UP,
    duration: Variables.animations.durationBase
};

FadeInDirectionView.propTypes = {
    animate: PropTypes.bool,
    animateOnUpdate: PropTypes.bool,
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
    delay: PropTypes.number,
    direction: PropTypes.number,
    duration: PropTypes.number,
    style: PropTypes.oneOfType([ PropTypes.array, PropTypes.number, PropTypes.object ])
};
