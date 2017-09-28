import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { convertMetersPerSecondToKilometersPerHour, convertMetersPerSecondToMilesPerHour } from '../util/convert-units';

import PropTypes from 'prop-types';
import { SPEED_MEASUREMENTS } from '../ducks/speed-measurement';
import { Variables } from '../assets/styles/variables';

const styles = StyleSheet.create({
    value: {
        backgroundColor: 'transparent',
        color: Variables.colors.white,
        fontFamily: Variables.fonts.digital.regular,
        fontSize: Variables.fontSizes.medium * 1.3,
        lineHeight: Variables.lineHeights.medium * 1.3
    },
    valueBackground: {
        opacity: 0.2,
        position: 'absolute',
    },
    valueContainer: {
        backgroundColor: Variables.colors.primary.darken(0.1),
        borderRadius: Variables.border.radius,
        paddingHorizontal: Variables.spacer.base / 4,
        paddingVertical: Variables.spacer.base / 8
    },
    unit: {
        color: Variables.colors.white,
        fontFamily: Variables.fonts.sansSerif.bold,
        fontSize: Variables.fontSizes.medium,
        lineHeight: Variables.lineHeights.medium
    },
    unitContainer: {
        paddingHorizontal: Variables.spacer.base / 4,
        paddingVertical: Variables.spacer.base / 8
    }
});

export class Odometer extends Component {

    // convertValue() {
    //     const { valueMeasurement, value } = this.props;
    //     const conversion = valueMeasurement === SPEED_MEASUREMENTS.KILOMETERS ? convertMetersPerSecondToKilometersPerHour : convertMetersPerSecondToMilesPerHour;

    //     return conversion(value);
    // }

    render() {
        const { style, distanceMeasurement } = this.props;
        const unit = distanceMeasurement === SPEED_MEASUREMENTS.KILOMETERS ? 'km' : 'mi';

        return (
            <View style={[style]}>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <View style={styles.valueContainer}>
                        <View style={{ position: 'relative' }}>
                            <Text style={[styles.value, styles.valueBackground]}>0000.00</Text>
                            <Text style={styles.value}>{'   '}1.01</Text>
                        </View>
                    </View>
                    <View style={styles.unitContainer}><Text style={styles.unit}>{unit.toLowerCase()}</Text></View>
                </View>
            </View>
        );
    }
}

Odometer.defaultProps = {
    distanceMeasurement: SPEED_MEASUREMENTS.MILES
};

Odometer.propTypes = {
    distanceMeasurement: PropTypes.number,
    style: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.object
    ])
};
