import { Location, Permissions } from 'expo';
import React, { Component } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

import { CubeRotateView } from './animations/cube-rotate-view';
import { DashboardScreen } from './screens/dashboard';
import { GEOLOCATION_OPTIONS } from '../config/config';
import { PreloaderScreen } from './screens/preloader-screen';
import PropTypes from 'prop-types';
import { RouteScreen } from './screens/route';
import { Variables } from '../assets/styles/variables';
import { calculateDistance } from '../util/calculate-distance';
import { connect } from 'react-redux';
import { toggleUnitMeasurement } from '../ducks/unit-measurement';

export const SCREENS = {
    DASHBOARD: 0,
    ROUTE: 1,
    SETTINGS: 2,
    ABOUT: 3
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Variables.colors.tertiary,
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
            screenIndex: SCREENS.DASHBOARD,
            speed: 0,
            topSpeed: 0
        };

        this.setScreenIndex = this.setScreenIndex.bind(this);
        this.updateSpeed = this.updateSpeed.bind(this);
    }

    componentWillMount() {
        Permissions.askAsync(Permissions.LOCATION).then(response => {
            const { status } = response;
            if (status === 'granted') Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.updateSpeed);
        });
    }

    setScreenIndex(index) {
        this.setState({ screenIndex: index || SCREENS.DASHBOARD });
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
            routeCoordinates: routeCoordinates.concat([{ latitude, longitude }]),
            speed,
            topSpeed: topSpeed < speed ? speed : topSpeed
        });
    }

    render() {
        const { unitMeasurement, toggleUnitMeasurement } = this.props;
        let { accuracy, distanceTravelled, heading, routeCoordinates, speed, topSpeed, screenIndex } = this.state;

        console.log('routeCoordinates: ', routeCoordinates);

        return (
            <View style={styles.container}>
                <StatusBar barStyle={'light-content'} />
                {routeCoordinates[0]
                    ? <CubeRotateView animateToIndex={screenIndex}>
                        <View style={styles.screen}>
                            <DashboardScreen
                                accuracy={accuracy}
                                distanceTravelled={distanceTravelled}
                                heading={heading}
                                speed={speed}
                                unit={unitMeasurement}
                                toggleUnitMeasurement={toggleUnitMeasurement}
                                topSpeed={topSpeed}
                                setScreenIndex={this.setScreenIndex}
                            />
                        </View>
                        <View style={styles.screen}>
                            <RouteScreen
                                distanceTravelled={distanceTravelled}
                                routeCoordinates={routeCoordinates}
                                setScreenIndex={this.setScreenIndex}
                                unit={unitMeasurement}
                            />
                        </View>
                    </CubeRotateView>
                    : <PreloaderScreen
                        loadingMessage={'getting location...'}
                        backgroundColor={Variables.colors.primary}
                    />
                }
            </View>
        );
    }
}

App.propTypes = {
    geolocation: PropTypes.object,
    requestGeolocation: PropTypes.func,
    unitMeasurement: PropTypes.number,
    toggleUnitMeasurement: PropTypes.func
};

export default connect(
    state => Object.assign({},
        state.unitMeasurementDuck
    ),
    Object.assign({}, {
        toggleUnitMeasurement
    })
)(App);
