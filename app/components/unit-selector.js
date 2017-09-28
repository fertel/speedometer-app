import { Animated, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { SPEED_MEASUREMENTS } from '../ducks/speed-measurement';
import { Variables } from '../assets/styles/variables';

const styles = StyleSheet.create({
    container: {
        padding: Variables.spacer.base / 2,
        marginTop: Variables.spacer.base
    },
    text: {
        color: Variables.colors.white,
        fontFamily: Variables.fonts.sansSerif.bold,
        fontSize: Variables.fontSizes.medium,
        lineHeight: Variables.lineHeights.medium
    }
});

export class UnitSelector extends Component {

    constructor(props) {
        super(props);

        this.animateButton = this.animateButton.bind(this);
        this.getTransform = this.getTransform.bind(this);
        this.onPress = this.onPress.bind(this);
    }

    componentWillMount() {
        this.springAnimation = new Animated.Value(0);
    }

    animateButton() {
        this.springAnimation.setValue(0);

        Animated.spring(this.springAnimation, {
            friction: 5,
            tension: 100,
            toValue: 2
        }).start();
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

        this.animateButton();
        if (onPress) onPress();
    }

    render() {
        const { speedMeasurement } = this.props;
        const value = speedMeasurement === SPEED_MEASUREMENTS.KILOMETERS ? 'km/h' : 'mph';

        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={this.onPress}>
                    <Animated.View style={[styles.container, this.getTransform()]}>
                        <Text style={styles.text}>{value.toUpperCase()}</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

UnitSelector.defaultProps = {
    speedMeasurement: SPEED_MEASUREMENTS.MILES
};

UnitSelector.propTypes = {
    onPress: PropTypes.func,
    speedMeasurement: PropTypes.number
};
