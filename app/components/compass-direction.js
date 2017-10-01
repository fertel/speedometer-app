import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';

import PropTypes from 'prop-types';
import { Variables } from '../assets/styles/variables';

const styles = StyleSheet.create({
    text: {
        fontFamily: Variables.fonts.sansSerif.bold,
        fontSize: Variables.fontSizes.medium,
        lineHeight: Variables.lineHeights.medium
    }
});

export class CompassDirection extends Component {

    shouldComponentUpdate(nextProps) {
        const { active } = nextProps;
        return active !== this.props.active;
    }

    render() {
        const { activeColor, active, inactiveColor, style, value } = this.props;
        const color = active ? activeColor : inactiveColor;

        return (
            <Text style={[styles.text, { color }, style]}>
                {value.toUpperCase()}
            </Text>
        );
    }
}

CompassDirection.defaultProps = {
    active: false,
    activeColor: Variables.colors.secondary,
    inactiveColor: Variables.colors.white.fade(0.9),
    value: 'N'
};

CompassDirection.propTypes = {
    active: PropTypes.bool,
    activeColor: PropTypes.object,
    inactiveColor: PropTypes.object,
    style: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ]),
    value: PropTypes.string
};
