import { Constants, KeepAwake } from 'expo';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { Compass } from '../compass';
import { LineChart } from '../line-chart';
import PropTypes from 'prop-types';
import { SidebarMenuToggle } from '../sidebar-menu-toggle';
import { SignalStrength } from '../signal-strength';
import { SmallGuage } from '../small-guage';
import { Speedometer } from '../speedometer';
import { Timer } from '../timer';
import { Variables } from '../../assets/styles/variables';
import { connect } from 'react-redux';
import { toggleUnitMeasurement } from '../../ducks/unit-measurement';

const styles = StyleSheet.create({
    container: {
        backgroundColor: Variables.colors.primary,
        flex: 1
    },
    sidebarMenuToggle: {
        position: 'absolute',
        left: Variables.spacer.base / 2,
        top: Constants.statusBarHeight + Variables.spacer.base / 2
    },
    signalStrength: {
        position: 'absolute',
        right: Variables.spacer.base / 2,
        top: Constants.statusBarHeight + Variables.spacer.base / 2
    }
});

export class DashboardScreen extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = { speed: 0, topSpeed: 0, speeds: [0, 20, 40, 1, 59, 0, 30, 10, 5, 1, 2, 3] };
    // }

    // componentDidMount() {
    //     setInterval(() => {
    //         this.setState({
    //             speed: Math.floor(Math.random() * 59),
    //             topSpeed: Math.floor(Math.random() * 59)
    //         });
    //     }, 1000);
    // }

    render() {
        // let { accuracy, distanceTravelled, heading, setScreenIndex, unitMeasurement, style, toggleUnitMeasurement, toggleSidebarMenu } = this.props;
        const { accuracy, distanceTravelled, heading, setScreenIndex, speed, speeds, style, toggleSidebarMenu, toggleUnitMeasurement, topSpeed, unitMeasurement } = this.props;
        // const { speed, topSpeed, speeds } = this.state;

        return (
            <View style={[styles.container, style]}>
                <KeepAwake />
                <SignalStrength accuracy={accuracy} style={styles.signalStrength} />
                {/* <SidebarMenuToggle
                    onPress={toggleSidebarMenu}
                    style={styles.sidebarMenuToggle}
                /> */}
                {/* <Compass heading={heading} style={{ flex: 2 }} /> */}
                <Speedometer
                    distanceTravelled={distanceTravelled}
                    setScreenIndex={setScreenIndex}
                    speed={speed}
                    style={{ flex: 8 }}
                    toggleUnitMeasurement={toggleUnitMeasurement}
                    topSpeed={topSpeed}
                    unit={unitMeasurement}
                />
                <LineChart
                    speed={speed}
                    style={{ flex: 3 }}
                    topSpeed={topSpeed}
                    unit={unitMeasurement}
                />
                <View style={{ flex: 2, paddingHorizontal: Variables.spacer.base, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <SmallGuage
                        color={Variables.colors.secondary}
                        label={'Avg'}
                        unit={unitMeasurement}
                        value={speed}
                    />
                    <SmallGuage
                        color={Variables.colors.secondary}
                        label={'Max'}
                        unit={unitMeasurement}
                        value={topSpeed}
                    />
                    <Timer
                        color={Variables.colors.secondary}
                        label={'Duration'}
                        value={topSpeed}
                    />
                </View>
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
    toggleSidebarMenu: PropTypes.func,
    toggleUnitMeasurement: PropTypes.func,
    topSpeed: PropTypes.number,
    unitMeasurement: PropTypes.number
};

export default connect(
    state => Object.assign({},
        state.geolocationDuck,
        state.unitMeasurementDuck
    ),
    Object.assign({}, {
        toggleUnitMeasurement,
    })
)(DashboardScreen);
