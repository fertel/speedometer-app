import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import PropTypes from 'prop-types';
import { Variables } from '../assets/styles/variables';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 1
    }
});

export class SignalStrengthBar extends Component {

    render() {
        const { activeColor, active, inactiveColor, style } = this.props;
        const backgroundColor = active ? activeColor : inactiveColor;

        return (
            <View style={[styles.container, { backgroundColor }, style]} />
        );
    }
}

SignalStrengthBar.defaultProps = {
    active: false,
    activeColor: Variables.colors.secondary,
    inactiveColor: Variables.colors.white.fade(0.9)
};

SignalStrengthBar.propTypes = {
    active: PropTypes.bool,
    activeColor: PropTypes.object,
    inactiveColor: PropTypes.object,
    style: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.object
    ])
};
