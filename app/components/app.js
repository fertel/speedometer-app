import React, { Component } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

import DashboardScreen from './screens/dashboard-screen';
import { Permissions } from 'expo';
import { PreloaderScreen } from './screens/preloader-screen';
import PropTypes from 'prop-types';
import RouteScreen from './screens/route-screen';
import { TransitionContainer } from './transition-container';
import { Variables } from '../assets/styles/variables';
import { connect } from 'react-redux';
import { watchGeolocation } from '../ducks/geolocation';

export const SCREENS = {
    PRELOADER: 0,
    DASHBOARD: 1,
    ROUTE: 2,
    SETTINGS: 3,
    ABOUT: 4
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Variables.colors.primary,
        flex: 1,
        position: 'relative'
    },
    preloader: {
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0
    }
});

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            appIsLoaded: false,
            screenIndex: SCREENS.PRELOADER
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
        const { appIsLoaded } = this.state;

        // TODO: find better way to make the preloader wait
        // at least three seconds before fading out
        if (routeCoordinates[0] && !appIsLoaded) {
            setTimeout(() => {
                this.setState({
                    appIsLoaded: true,
                    screenIndex: SCREENS.DASHBOARD
                });
            }, 1000);
        }
    }

    setScreenIndex(index) {
        this.setState({ screenIndex: index || SCREENS.DASHBOARD });
    }

    render() {
        const { screenIndex } = this.state;

        return (
            <View style={styles.container}>
                <StatusBar barStyle={'light-content'} />
                <TransitionContainer setScreenIndex={this.setScreenIndex} screenIndex={screenIndex}>
                    <PreloaderScreen
                        loadingMessage={'Getting location...'}
                        style={styles.preloader}
                        backgroundColor={Variables.colors.primary}
                    />
                    <DashboardScreen />
                    <RouteScreen />
                </TransitionContainer>
            </View>
        );
    }
}

App.propTypes = {
    routeCoordinates: PropTypes.array,
    watchGeolocation: PropTypes.func
};

export default connect(
    state => Object.assign({}, state.geolocationDuck ),
    Object.assign({}, { watchGeolocation })
)(App);
