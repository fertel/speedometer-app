import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import PropTypes from 'prop-types';
import { Svg } from 'expo';
import { Variables } from '../assets/styles/variables';

const styles = StyleSheet.create({
    circle: { transform: [ { rotate: '150deg' }] },
    container: { position: 'relative' }
});

export class CircleGuage extends Component {

    constructor(props) {
        super(props);
        this.renderSegments = this.renderSegments.bind(this);
    }

    renderSegments() {
        const { colors, diameter, percentageFull, strokeWidth, hasDangerZone } = this.props;

        const radius = diameter / 2;
        const radiusAdjusted = radius - (strokeWidth * 2);
        const circumfrenceAdjusted = Math.PI * (radiusAdjusted * 2);
        const radiusShift = circumfrenceAdjusted / diameter;
        const limit = diameter * (4/6);
        const segmentsFull = Math.ceil(percentageFull * limit) / 100;

        const results = [];

        for (let index = 0; index < diameter && index < limit; index++) {

            const startColor = colors[0];
            const mixColor = colors[1];

            let color = index < segmentsFull ? mixColor.mix(startColor, index * (1 / limit)) : Variables.colors.white.fade(0.9);

            if (hasDangerZone && index < segmentsFull && index > limit - 36) color = colors[2];
            if (index % 2) color = Variables.colors.white.fade(1);

            results.push(
                <Svg.Circle
                    cx={'50%'}
                    cy={'50%'}
                    key={index}
                    fill={'none'}
                    r={radiusAdjusted}
                    stroke={color.string()}
                    strokeDasharray={[radiusShift, circumfrenceAdjusted]}
                    strokeDashoffset={-radiusShift * index}
                    strokeWidth={strokeWidth}
                />
            );
        }

        return results;
    }

    render() {
        const { diameter } = this.props;

        return (
            <View style={styles.container}>
                <Svg height={diameter} width={diameter} style={styles.circle}>
                    {this.renderSegments()}
                </Svg>
            </View>
        );
    }
}

CircleGuage.defaultProps = {
    colors: [Variables.colors.secondary, Variables.colors.tertiary, Variables.colors.danger],
    diameter: 360,
    hasDangerZone: false,
    percentageFull: 0,
    strokeWidth: 15
};

CircleGuage.propTypes = {
    colors: PropTypes.array,
    diameter: PropTypes.number,
    hasDangerZone: PropTypes.bool,
    percentageFull: PropTypes.number,
    strokeWidth: PropTypes.number
};
