import { Animated, StyleSheet, View } from 'react-native';
import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Variables } from '../assets/styles/variables';

const styles = StyleSheet.create({
    shadow: {
        borderRadius: Variables.spacer.base * 2,
        height: Variables.spacer.base * 2,
        shadowOpacity: 0.7,
        shadowRadius: Variables.spacer.base / 3,
        width: Variables.spacer.base * 2
    }
});

export class GlowingActivityIndicator extends Component {

    constructor(props) {
        super(props);

        this.animate = this.animate.bind(this);
        this.getTransform = this.getTransform.bind(this);
    }

    componentWillMount() {
        this.animation = new Animated.Value(0);
    }

    componentDidMount() {
        this.animate();
    }

    animate() {
        const { delay, duration } = this.props;

        Animated.timing(this.animation, {
            delay: delay,
            duration: duration,
            easing: Variables.animations.defaultEasing,
            toValue: 1,
            useNativeDriver: true
        }).start();
    }

    getTransform() {
        const interpolatedAnimation = this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        });

        const transform = [{ rotate: interpolatedAnimation }];

        return { transform };
    }

    render() {
        const { style } = this.props;

        return (
            <Animated.View style={[
                styles.shadow,
                this.getTransform(),
                { shadowColor: Variables.colors.secondary },
                { shadowOffset: { width: -Variables.spacer.base / 3, height: 0 } },
                style]}
            >
                <Animated.View style={[
                    styles.shadow,
                    this.getTransform(),
                    { shadowColor: Variables.colors.tertiary },
                    { shadowOffset: { width: Variables.spacer.base / 3, height: 0 } },
                    style]}
                >
                    <Animated.View style={[
                        styles.shadow,
                        this.getTransform(),
                        { shadowColor: Variables.colors.danger },
                        { shadowOffset: { width: 0, height: -Variables.spacer.base / 3 } },
                        style]}
                    >
                        <Animated.View style={[
                            styles.shadow,
                            this.getTransform(),
                            { shadowColor: Variables.colors.warning },
                            { shadowOffset: { width: 0, height: Variables.spacer.base / 3 } },
                            style]}
                        >
                        </Animated.View>
                    </Animated.View>
                </Animated.View>
            </Animated.View>
        );
    }
}

GlowingActivityIndicator.defaultProps = {
    delay: 0,
    duration: Variables.animations.durationBase * 60
};

GlowingActivityIndicator.propTypes = {
    delay: PropTypes.number,
    duration: PropTypes.number,
    style: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ])
};
