import { Constants, KeepAwake, Location, Permissions } from 'expo';
import React, { Component } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

import { Compass } from './compass';
import { GEOLOCATION_OPTIONS } from '../config/config';
import PropTypes from 'prop-types';
import { SignalStrength } from './signal-strength';
import { Speedometer } from './speedometer';
import { Variables } from '../assets/styles/variables';
import { connect } from 'react-redux';
import { toggleSpeedMeasurement } from '../ducks/speed-measurement';

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

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            accuracy: 40,
            heading: -1, // set to -1 to prevent flash of 0 degrees of ('N') on the compass on load
            speed: 0,
            topSpeed: 0
        };

        this.updateSpeed = this.updateSpeed.bind(this);
    }

    componentWillMount() {
        Permissions.askAsync(Permissions.LOCATION).then(response => {
            const { status } = response;
            if (status === 'granted') Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.updateSpeed);
        });
    }

    updateSpeed(response) {
        const { coords } = response;
        const { accuracy, heading, speed } = coords;
        const { topSpeed } = this.state;

        this.setState({
            accuracy,
            heading,
            speed,
            topSpeed: topSpeed < speed ? speed : topSpeed
        });
    }

    render() {
        const { speedMeasurement, toggleSpeedMeasurement } = this.props;
        const { accuracy, speed, topSpeed, heading } = this.state;

        return (
            <View style={styles.container}>
                <StatusBar barStyle={'light-content'} />
                <KeepAwake />
                <SignalStrength style={styles.signalStrength} accuracy={accuracy} />
                <Compass
                    style={{ flex: 1 }}
                    heading={heading}
                />
                <Speedometer
                    speed={speed}
                    speedMeasurement={speedMeasurement}
                    style={{ flex: 4 }}
                    toggleSpeedMeasurement={toggleSpeedMeasurement}
                    topSpeed={topSpeed}
                />
            </View>
        );
    }
}

App.propTypes = {
    geolocation: PropTypes.object,
    requestGeolocation: PropTypes.func,
    speedMeasurement: PropTypes.number,
    toggleSpeedMeasurement: PropTypes.func
};

export default connect(
    state => Object.assign({},
        state.speedMeasurementDuck
    ),
    Object.assign({}, {
        toggleSpeedMeasurement
    })
)(App);
