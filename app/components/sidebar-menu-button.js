import { Animated, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Variables } from '../assets/styles/variables';

const styles = StyleSheet.create({
    buttonContainer: {
        padding: Variables.spacer.base / 2,
        alignSelf: 'stretch'
    },
    container: {
        alignSelf: 'stretch'
    },
    text: {
        fontFamily: Variables.fonts.sansSerif.bold,
        fontSize: Variables.fontSizes.medium,
        lineHeight: Variables.lineHeights.medium,
        textAlign: 'left'
    }
});

export class SidebarMenuButton extends Component {

    constructor(props) {
        super(props);

        this.animate = this.animate.bind(this);
        this.getBackgroundColor = this.getBackgroundColor.bind(this);
        this.getTextColor = this.getTextColor.bind(this);
        this.getTransform = this.getTransform.bind(this);
        this.onPress = this.onPress.bind(this);
    }

    componentWillMount() {
        this.springAnimation = new Animated.Value(0);
        this.timingAnimation = new Animated.Value(0);
    }

    animate() {
        this.springAnimation.setValue(0);
        this.timingAnimation.setValue(0);

        Animated.spring(this.springAnimation, {
            friction: 5,
            tension: 100,
            toValue: 2
        }).start();

        Animated.timing(this.timingAnimation, {
            duration: Variables.animations.durationBase,
            easing: Variables.animations.defaultEasing,
            toValue: 2
        }).start();
    }

    getBackgroundColor() {
        const { inverted } = this.props;

        const fromValue = inverted ? Variables.colors.white : this.props.color;
        const toValue = inverted ? this.props.color : Variables.colors.white;

        const backgroundColor = this.timingAnimation.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [
                fromValue.rgb().string(),
                toValue.rgb().string(),
                fromValue.rgb().string()
            ]
        });

        return { backgroundColor };
    }

    getTextColor() {
        const { inverted } = this.props;

        const fromValue = inverted ? this.props.color : Variables.colors.white;
        const toValue = inverted ? Variables.colors.white : this.props.color;

        const color = this.timingAnimation.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [
                fromValue.rgb().string(),
                toValue.rgb().string(),
                fromValue.rgb().string()
            ]
        });

        return { color };
    }

    getTransform() {
        const scale = this.springAnimation.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [1, 1.2, 1]
        });

        return { transform: [{ scale }] };
    }

    onPress() {
        const { onPress } = this.props;

        this.animate();
        if (onPress) onPress();
    }

    render() {
        const { style, value, inverted, color } = this.props;

        return (
            <View style={[styles.container, style]}>
                <TouchableWithoutFeedback onPress={this.onPress}>
                    <Animated.View style={[
                        styles.buttonContainer,
                        this.getBackgroundColor(),
                        this.getTransform()
                    ]}>
                        <Animated.Text style={[styles.text, this.getTextColor()]}>{value.toUpperCase()}</Animated.Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

SidebarMenuButton.defaultProps = {
    color: Variables.colors.black,
    inverted: false,
    value: 'Button'
};

SidebarMenuButton.propTypes = {
    color: PropTypes.object,
    onPress: PropTypes.func,
    inverted: PropTypes.bool,
    value: PropTypes.string,
    style: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.number,
        PropTypes.object
    ]),
};
