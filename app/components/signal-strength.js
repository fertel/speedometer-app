import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import PropTypes from 'prop-types';
import { SignalStrengthBar } from './signal-strength-bar';
import { Variables } from '../assets/styles/variables';

const styles = StyleSheet.create({
    barContainer: {
        alignItems: 'flex-end',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    container: {
        height: Variables.spacer.base * (3/4),
        width: Variables.spacer.base * (3/4)
    }
});

export class SignalStrength extends Component {

    render() {
        const { accuracy, style } = this.props;

        return (
            <View style={[styles.container, style]}>
                <View style={styles.barContainer}>
                    <SignalStrengthBar
                        active={accuracy < 40}
                        activeColor={Variables.colors.danger}
                        heightPercentage={25}
                    />
                    <SignalStrengthBar
                        active={accuracy < 30}
                        activeColor={Variables.colors.warning}
                        heightPercentage={50}
                    />
                    <SignalStrengthBar
                        active={accuracy < 20}
                        activeColor={Variables.colors.secondary}
                        heightPercentage={75}
                    />
                    <SignalStrengthBar
                        active={accuracy < 10}
                        activeColor={Variables.colors.tertiary}
                        heightPercentage={100}
                    />
                </View>
            </View>
        );
    }
}

SignalStrength.defaultProps = {
    accuracy: 40
};

SignalStrength.propTypes = {
    accuracy: PropTypes.number,
    style: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ])
};
