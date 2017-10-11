import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import PropTypes from 'prop-types';
import { Speed } from './speed';
import { UNIT_MEASUREMENT } from '../ducks/unit-measurement';
import { Variables } from '../assets/styles/variables';

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    label: {
        backgroundColor: 'transparent',
        color: Variables.colors.white,
        fontFamily: Variables.fonts.sansSerif.bold,
        fontSize: Variables.fontSizes.small,
        lineHeight: Variables.lineHeights.small,
        textAlign: 'center'
    },
    labelContainer: {
        alignItems: 'center',
        borderBottomLeftRadius: Variables.border.radius,
        borderBottomRightRadius: Variables.border.radius,
        justifyContent: 'center',
        paddingVertical: Variables.spacer.base / 6
    },
    valueBackground: {
        alignItems: 'center',
        backgroundColor: Variables.colors.primaryDark,
        borderRadius: Variables.border.radius,
        borderTopLeftRadius: Variables.border.radius,
        borderTopRightRadius: Variables.border.radius,
        paddingVertical: Variables.spacer.base / 4,
        paddingHorizontal: Variables.spacer.base / 2,
        position: 'relative'
    }
});

export class SmallGuage extends Component {

    render() {
        const { style, unit, value, label, color } = this.props;

        return (
            <View style={[styles.container, style]}>
                <View style={styles.valueBackground}>
                    <Speed
                        color={color}
                        fontSize={Variables.fontSizes.medium * 2}
                        lineHeight={Variables.fontSizes.medium * 2}
                        unit={unit}
                        value={value}
                    />
                </View>
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>{label.toUpperCase()}</Text>
                </View>
            </View>
        );
    }
}

SmallGuage.defaultProps = {
    color: Variables.colors.white,
    label: 'Lab.',
    unit: UNIT_MEASUREMENT.MILES,
    value: 0
};

SmallGuage.propTypes = {
    color: PropTypes.object,
    label: PropTypes.string,
    style: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ]),
    unit: PropTypes.number,
    value: PropTypes.number
};
