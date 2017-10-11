import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import PropTypes from 'prop-types';
import { Variables } from '../assets/styles/variables';
import { formatSecondsToTime } from '../util/format-seconds-to-time';

const styles = StyleSheet.create({
    container: { position: 'relative' },
    label: {
        backgroundColor: 'transparent',
        color: Variables.colors.white,
        fontFamily: Variables.fonts.sansSerif.bold,
        fontSize: Variables.fontSizes.small,
        lineHeight: Variables.lineHeights.small,
        textAlign: 'center'
    },
    labelContainer: {
        alignItems: 'center',
        borderBottomLeftRadius: Variables.border.radius,
        borderBottomRightRadius: Variables.border.radius,
        justifyContent: 'center',
        paddingVertical: Variables.spacer.base / 6
    },
    timeContainer: { position: 'relative' },
    time: {
        backgroundColor: 'transparent',
        fontFamily: Variables.fonts.digital.regular,
        fontSize: Variables.fontSizes.medium * 2,
        lineHeight: Variables.fontSizes.medium * 2,
        textAlign: 'right'
    },
    timeBackground: { opacity: 0.2 },
    timeForeground: {
        position: 'absolute',
        right: 0
    },
    valueBackground: {
        alignItems: 'center',
        backgroundColor: Variables.colors.primaryDark,
        borderRadius: Variables.border.radius,
        borderTopLeftRadius: Variables.border.radius,
        borderTopRightRadius: Variables.border.radius,
        paddingVertical: Variables.spacer.base / 4,
        paddingHorizontal: Variables.spacer.base / 2,
        position: 'relative'
    }
});

export class Timer extends Component {

    constructor(props) {
        super(props);
        this.state = { secondsElapsed: 0 };

        this.incrementer = null;
    }

    componentDidMount() {
        this.incrementer = setInterval(() => this.setState({ secondsElapsed: this.state.secondsElapsed + 1 }), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.incrementer);
    }

    render() {
        const { style, label, color } = this.props;
        const { secondsElapsed } = this.state;

        return (
            <View style={[styles.container, style]}>
                <View style={styles.valueBackground}>
                    <View style={styles.timeContainer}>
                        <Text style={[styles.time, styles.timeBackground, { color }]}>88:88</Text>
                        <Text style={[styles.time, styles.timeForeground, { color }]}>{formatSecondsToTime(secondsElapsed)}</Text>
                    </View>
                </View>
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>{label.toUpperCase()}</Text>
                </View>
            </View>
        );
    }
}

Timer.defaultProps = {
    color: Variables.colors.white,
    label: 'Lab'
};

Timer.propTypes = {
    color: PropTypes.object,
    label: PropTypes.string,
    style: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ])
};
