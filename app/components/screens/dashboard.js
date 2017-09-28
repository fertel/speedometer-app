import { Constants, KeepAwake } from 'expo';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { Compass } from '../compass';
import PropTypes from 'prop-types';
import { SignalStrength } from '../signal-strength';
import { Speedometer } from '../speedometer';
import { Variables } from '../../assets/styles/variables';

const styles = StyleSheet.create({
    container: {
        backgroundColor: Variables.colors.primary,
        flex: 1
    },
    signalStrength: {
        position: 'absolute',
        right: Variables.spacer.base / 2,
        top: Constants.statusBarHeight + Variables.spacer.base / 2
    }
});

export class DashboardScreen extends Component {

    render() {
        const { accuracy, distanceTravelled, heading, setScreenIndex, speed, unit, style, toggleUnitMeasurement, topSpeed } = this.props;

        return (
            <View style={[styles.container, style]}>
                <KeepAwake />
                <SignalStrength accuracy={accuracy} style={styles.signalStrength} />
                <Compass heading={heading} style={{ flex: 1 }} />
                <Speedometer
                    distanceTravelled={distanceTravelled}
                    setScreenIndex={setScreenIndex}
                    speed={speed}
                    style={{ flex: 5 }}
                    toggleUnitMeasurement={toggleUnitMeasurement}
                    topSpeed={topSpeed}
                    unit={unit}
                />
            </View>
        );
    }
}

DashboardScreen.defaultProps = {

};

DashboardScreen.propTypes = {
    accuracy: PropTypes.number,
    distanceTravelled: PropTypes.number,
    heading: PropTypes.number,
    setScreenIndex: PropTypes.func,
    speed: PropTypes.number,
    style: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ]),
    toggleUnitMeasurement: PropTypes.func,
    topSpeed: PropTypes.number,
    unit: PropTypes.number
};
