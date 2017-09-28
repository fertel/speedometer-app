import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { CircleGuage } from './circle-guage';
import { Odometer } from './odometer';
import PropTypes from 'prop-types';
import { SCREENS } from './app';
import { Speed } from './speed';
import { UnitSelector } from './unit-selector';
import { Variables } from '../assets/styles/variables';

const styles = StyleSheet.create({
    absolutePosition: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        bottom: 0,
        flex: 1,
        justifyContent: 'flex-start',
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0
    },
    container: { flex: 1 }
});

export class Speedometer extends Component {

    render() {
        const { distanceTravelled, maxSpeed, setScreenIndex, speed, unit, style, toggleSpeedMeasurement, topSpeed } = this.props;

        return (
            <View style={[styles.container, style]}>
                <View style={styles.absolutePosition}>
                    <CircleGuage
                        diameter={380}
                        hasDangerZone
                        percentageFull={speed / maxSpeed * 100}
                    />
                </View>
                <View style={styles.absolutePosition}>
                    <CircleGuage
                        colors={[Variables.colors.danger, Variables.colors.warning, Variables.colors.danger]}
                        diameter={380}
                        percentageFull={topSpeed / maxSpeed * 100}
                        strokeWidth={8}
                        hasDangerZone
                    />
                </View>
                <View style={styles.absolutePosition}>
                    <UnitSelector onPress={toggleSpeedMeasurement} speedMeasurement={unit} />
                    <Speed
                        color={speed > maxSpeed ? Variables.colors.danger : Variables.colors.white}
                        value={speed}
                        unit={unit}
                    />
                    <Odometer
                        onPress={() => setScreenIndex(SCREENS.ROUTE)}
                        unit={unit}
                        value={distanceTravelled}
                    />
                </View>
            </View>
        );
    }
}

Speedometer.defaultProps = {
    distanceTravelled: 0,
    maxSpeed: 59, // roughly 130 MPH or 210 KM/H
    speed: 0,
    topSpeed: 0
};

Speedometer.propTypes = {
    distanceTravelled: PropTypes.number,
    maxSpeed: PropTypes.number,
    setScreenIndex: PropTypes.func,
    speed: PropTypes.number,
    style: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ]),
    toggleSpeedMeasurement: PropTypes.func,
    topSpeed: PropTypes.number,
    unit: PropTypes.number
};
