import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { CompassDirection } from './compass-direction';
import PropTypes from 'prop-types';
import { Variables } from '../assets/styles/variables';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        padding: Variables.spacer.base
    },
    direction: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: Variables.spacer.base / 2
    },
    directionContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    text: {
        color: Variables.colors.white,
        fontFamily: Variables.fonts.sansSerif.bold,
        fontSize: Variables.fontSizes.medium,
        lineHeight: Variables.lineHeights.medium
    }
});

export class Compass extends Component {

    render() {
        const { style, heading } = this.props;

        return (
            <View style={[styles.container, style]}>
                <View style={styles.directionContainer}>
                    <View style={styles.direction}>
                        <CompassDirection
                            value={'N'}
                            active={heading <= 45 || heading >= 315}
                            activeColor={Variables.colors.secondary}
                        />
                    </View>
                    <View style={styles.direction}>
                        <CompassDirection
                            value={'E'}
                            active={heading >= 45 && heading <= 135}
                            activeColor={Variables.colors.tertiary}
                        />
                    </View>
                    <View style={styles.direction}>
                        <CompassDirection
                            value={'S'}
                            active={heading >= 135 && heading <= 225}
                            activeColor={Variables.colors.quadrenary}
                        />
                    </View>
                    <View style={styles.direction}>
                        <CompassDirection
                            value={'W'}
                            active={heading >= 225 && heading <= 315}
                            activeColor={Variables.colors.warning}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

Compass.defaultProps = {
    heading: 0
};

Compass.propTypes = {
    heading: PropTypes.number,
    style: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.object
    ])
};
