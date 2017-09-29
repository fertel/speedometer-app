import { Constants, MapView } from 'expo';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { Odometer } from '../odometer';
import PropTypes from 'prop-types';
import { SCREENS } from '../app';
import { Variables } from '../../assets/styles/variables';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
    },
    odometerContainer: {
        backgroundColor: Variables.colors.black.fade(0.3),
        bottom: 0,
        left: 0,
        padding: Variables.spacer.base / 2,
        position: 'absolute',
        right: 0,
        zIndex: 10
    },
    statusBarBackround: {
        backgroundColor: Variables.colors.black.fade(0.3),
        height: Constants.statusBarHeight,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 10
    }
});

export class RouteScreen extends Component {

    render() {
        const { distanceTravelled, routeCoordinates, setScreenIndex, style, unit } = this.props;

        return (
            <View style={[styles.container, style]}>
                <View style={styles.statusBarBackround} />
                <MapView
                    style={styles.container}
                    showsUserLocation
                    followUserLocation
                    initialRegion={{
                        latitude: routeCoordinates[0].latitude,
                        latitudeDelta: 0.005,
                        longitude: routeCoordinates[0].longitude,
                        longitudeDelta: 0.005
                    }}
                >
                    <MapView.Polyline
                        coordinates={routeCoordinates}
                        strokeWidth={Variables.spacer.base / 3}
                        strokeColor={Variables.colors.tertiary.string()}
                        miterLimit={50}
                        lineCap={'round'}
                    />
                </MapView>
                <View style={styles.odometerContainer}>
                    <Odometer
                        onPress={() => setScreenIndex(SCREENS.DASHBOARD)}
                        unit={unit}
                        value={distanceTravelled}
                    />
                </View>
            </View>
        );
    }
}

RouteScreen.defaultProps = {
    routeCoordinates: []
};

RouteScreen.propTypes = {
    distanceTravelled: PropTypes.number,
    routeCoordinates: PropTypes.arrayOf(PropTypes.object),
    setScreenIndex: PropTypes.func,
    style: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ]),
    unit: PropTypes.number
};
