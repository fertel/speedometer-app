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
                            active={(heading <= 55 && heading >= 0)|| heading >= 305}
                            activeColor={Variables.colors.secondary}
                        />
                    </View>
                    <View style={styles.direction}>
                        <CompassDirection
                            value={'E'}
                            active={heading >= 35 && heading <= 145}
                            activeColor={Variables.colors.tertiary}
                        />
                    </View>
                    <View style={styles.direction}>
                        <CompassDirection
                            value={'S'}
                            active={heading >= 125 && heading <= 235}
                            activeColor={Variables.colors.quadrenary}
                        />
                    </View>
                    <View style={styles.direction}>
                        <CompassDirection
                            value={'W'}
                            active={heading >= 215 && heading <= 325}
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
