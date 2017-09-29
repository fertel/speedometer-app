import * as Animatable from 'react-native-animatable';

import { Location, Permissions } from 'expo';
import React, { Component } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

import { CubeRotateView } from './animations/cube-rotate-view';
import { DashboardScreen } from './screens/dashboard';
import { PreloaderScreen } from './screens/preloader-screen';
import PropTypes from 'prop-types';
import { RouteScreen } from './screens/route';
import { Variables } from '../assets/styles/variables';
import { calculateDistance } from '../util/calculate-distance';
import { connect } from 'react-redux';
import { toggleUnitMeasurement } from '../ducks/unit-measurement';
import { watchGeolocation } from '../ducks/geolocation';

export const SCREENS = {
    DASHBOARD: 0,
    ROUTE: 1,
    SETTINGS: 2,
    ABOUT: 3
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Variables.colors.tertiary,
        flex: 1,
        position: 'relative'
    },
    preloader: {
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0
    },
    screen: { flex: 1 }
});

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            appIsLoaded: false,
            screenIndex: SCREENS.DASHBOARD,
        };

        this.setScreenIndex = this.setScreenIndex.bind(this);
    }

    componentWillMount() {
        const { watchGeolocation } = this.props;

        Permissions.askAsync(Permissions.LOCATION).then(response => {
            const { status } = response;
            if (status === 'granted') watchGeolocation();
        });
    }

    componentDidUpdate() {
        const { routeCoordinates } = this.props;

        // TODO: find better way to make the preloader wait
        // at least three seconds before fading out
        if (routeCoordinates[0]) {
            setTimeout(() => {
                this.setState({ appIsLoaded: true });
            }, 3000);
        }
    }

    setScreenIndex(index) {
        this.setState({ screenIndex: index || SCREENS.DASHBOARD });
    }

    render() {
        const { accuracy, distanceTravelled, heading, routeCoordinates, speed, toggleUnitMeasurement, topSpeed, unitMeasurement } = this.props;
        const { screenIndex, appIsLoaded } = this.state;

        return (
            <View style={styles.container}>
                <StatusBar barStyle={'light-content'} />
                <PreloaderScreen
                    loadingMessage={'Getting location...'}
                    isLoading={!appIsLoaded}
                    style={styles.preloader}
                    backgroundColor={Variables.colors.primary}
                />
                {appIsLoaded &&
                    <Animatable.View
                        duration={Variables.animations.durationBase}
                        animation={'fadeIn'}
                        useNativeDriver
                        style={{ flex: 1 }}
                    >
                        <CubeRotateView animateToIndex={screenIndex}>
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
                    </Animatable.View>
                }
            </View>
        );
    }
}

App.propTypes = {
    accuracy: PropTypes.number,
    distanceTravelled: PropTypes.number,
    geolocation: PropTypes.object,
    heading: PropTypes.number,
    routeCoordinates: PropTypes.array,
    speed: PropTypes.number,
    toggleUnitMeasurement: PropTypes.func,
    topSpeed: PropTypes.number,
    unitMeasurement: PropTypes.number,
    watchGeolocation: PropTypes.func
};

export default connect(
    state => Object.assign({},
        state.geolocationDuck,
        state.unitMeasurementDuck
    ),
    Object.assign({}, {
        toggleUnitMeasurement,
        watchGeolocation
    })
)(App);
