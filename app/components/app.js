import { Location, MapView, Permissions } from 'expo';
import React, { Component } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

import { CubeRotateView } from './animations/cube-rotate-view';
import { DashboardScreen } from './screens/dashboard';
import { GEOLOCATION_OPTIONS } from '../config/config';
import PropTypes from 'prop-types';
import { Variables } from '../assets/styles/variables';
import { calculateDistance } from '../util/calculate-distance';
import { connect } from 'react-redux';
import { toggleSpeedMeasurement } from '../ducks/speed-measurement';

const styles = StyleSheet.create({
    container: {
        backgroundColor: Variables.colors.primary,
        flex: 1
    },
    screen: { flex: 1 }
});

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            accuracy: 40,
            distanceTravelled: 0, // in meters
            heading: -1, // set to -1 to prevent flash of 0 degrees of ('N') on the compass on load
            lastPosition: {},
            routeCoordinates: [],
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
        const { accuracy, heading, speed, latitude, longitude } = coords;
        const { topSpeed, routeCoordinates, distanceTravelled, lastPosition } = this.state;

        const currentPosition = { latitude, longitude };

        this.setState({
            accuracy,
            distanceTravelled: distanceTravelled + calculateDistance(lastPosition, currentPosition),
            heading,
            lastPosition: currentPosition,
            routeCoordinates: routeCoordinates.concat([currentPosition]),
            speed,
            topSpeed: topSpeed < speed ? speed : topSpeed
        });
    }

    render() {
        const { speedMeasurement, toggleSpeedMeasurement } = this.props;
        let { accuracy, speed, topSpeed, heading, routeCoordinates } = this.state;

        return (
            <View style={styles.container}>
                <StatusBar barStyle={'light-content'} />
                <CubeRotateView animateToIndex={0}>
                    <View style={styles.screen}>
                        <DashboardScreen
                            accuracy={accuracy}
                            heading={heading}
                            speed={speed}
                            speedMeasurement={speedMeasurement}
                            toggleSpeedMeasurement={toggleSpeedMeasurement}
                            topSpeed={topSpeed}
                        />
                    </View>
                    <View style={styles.screen}>
                        <MapView
                            style={{ flex: 1 }}
                            showsUserLocation={true}
                            followUserLocation={true}
                            overlays={[{
                                coordinates: routeCoordinates,
                                strokeColor: Variables.colors.tertiary,
                                lineWidth: Variables.spacer.base / 3,
                            }]}
                        />
                    </View>
                </CubeRotateView>
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
