import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import PropTypes from 'prop-types';
import { Svg } from 'expo';
import { Variables } from '../assets/styles/variables';
import eases from 'eases';

const styles = StyleSheet.create({
    circle: { transform: [ { rotate: '150deg' }] },
    container: { position: 'relative' }
});

export class CircleGuage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            previousPercentageFull: 0,
            currentPercentageFull: 0
        };

        this.renderSegments = this.renderSegments.bind(this);
        this.startAnimationTime = null;
        this.timeout = null;
        this.updateNumber = this.updateNumber.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { currentPercentageFull } = this.state;
        const { percentageFull } = this.props;
        const value = parseInt(percentageFull, 10);

        if (parseInt(nextProps.percentageFull, 10) === value) return;

        this.setState({ previousPercentageFull: currentPercentageFull });
        this.startAnimationTime = (new Date()).getTime();
        this.updateNumber();
    }

    shouldComponentUpdate(nextState) {
        return nextState.currentPercentageFull !== this.state.currentPercentageFull;
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
        clearTimeout(this.delayTimeout);
    }

    updateNumber() {
        const { ease, speed, percentageFull } = this.props;
        const { previousPercentageFull } = this.state;

        const value = parseInt(percentageFull, 10);
        const now = (new Date()).getTime();
        const elapsedTime = Math.min(speed, (now - this.startAnimationTime));
        const progress = eases[ease](elapsedTime / speed);
        const currentDisplayValue = Math.round((value - previousPercentageFull) * progress + previousPercentageFull);

        this.setState({ currentPercentageFull: currentDisplayValue });

        if (elapsedTime < speed) {
            this.timeout = setTimeout(this.updateNumber, 16);
        } else {
            this.setState({ previousPercentageFull: value });
        }
    }

    renderSegments() {
        const { colors, diameter, hasDangerZone, strokeWidth } = this.props;
        const { currentPercentageFull } = this.state;

        const radius = diameter / 2;
        const radiusAdjusted = radius - (strokeWidth * 2);
        const circumfrenceAdjusted = Math.PI * (radiusAdjusted * 2);
        const radiusShift = circumfrenceAdjusted / diameter;
        const limit = diameter * (4 / 6);
        const segmentsFull = Math.ceil(currentPercentageFull * limit) / 100;

        const results = [];

        for (let index = 0; index < limit; index++) {

            const startColor = colors[0];
            const mixColor = colors[1];

            let color = index < segmentsFull ? startColor.mix(mixColor, index * (1 / limit)) : Variables.colors.white.fade(0.9);

            if (hasDangerZone && index < segmentsFull && index > limit - 36) color = colors[2];

            if (!(index % 2)) results.push(
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
    ease: 'quintInOut',
    hasDangerZone: false,
    percentageFull: 0,
    speed: 500,
    strokeWidth: 15
};

CircleGuage.propTypes = {
    colors: PropTypes.array,
    diameter: PropTypes.number,
    ease: PropTypes.string,
    hasDangerZone: PropTypes.bool,
    percentageFull: PropTypes.number,
    speed: PropTypes.number,
    strokeWidth: PropTypes.number
};
