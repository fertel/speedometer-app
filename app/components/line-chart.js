import { MAX_SPEED, SPEED_CHART_MAX_LENGTH } from '../config/config';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { convertMetersPerSecondToKilometersPerHour, convertMetersPerSecondToMilesPerHour } from '../util/convert-units';

import { MultiLineChart } from 'react-native-d3multiline-chart';
import PropTypes from 'prop-types';
import { UNIT_MEASUREMENT } from '../ducks/unit-measurement';
import { Variables } from '../assets/styles/variables';
import _ from 'lodash';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: Variables.spacer.base / 2
    }
});

export class LineChart extends Component {

    constructor(props) {
        super(props);
        this.state = { speedData: Array.from(Array(SPEED_CHART_MAX_LENGTH)).fill(0) };

        this.convertValue = this.convertValue.bind(this);
        this.formatSpeedDataForChart = this.formatSpeedDataForChart.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { speed } = nextProps;
        const { speedData } = this.state;

        let updatedSpeedData = speedData;
        updatedSpeedData.push(speed);

        if (speedData.length > SPEED_CHART_MAX_LENGTH) updatedSpeedData.shift();

        this.setState({ speedData: updatedSpeedData });
    }

    convertValue(value) {
        const { unit } = this.props;
        const conversion = unit === UNIT_MEASUREMENT.KILOMETERS ? convertMetersPerSecondToKilometersPerHour : convertMetersPerSecondToMilesPerHour;

        return conversion(value);
    }

    formatSpeedDataForChart() {
        const { speedData } = this.state;

        const result = speedData.map((speed, index) => {
            return { 'y': this.convertValue(speed), 'x': index };
        });

        return result;
    }

    render() {
        const { style, speed } = this.props;
        const { speedData } = this.state;

        const maxSpeed = this.convertValue(_.max(speedData));
        const color = Variables.colors.warning.mix(Variables.colors.secondary, speed / MAX_SPEED);

        return (
            <View style={[styles.container, style]}>
                <MultiLineChart
                    Color={[color.string()]}
                    axisColor={Variables.colors.white.fade(0.9).string()}
                    chartHeight={125}
                    chartWidth={Variables.device.width - Variables.spacer.base}
                    data={[this.formatSpeedDataForChart()]}
                    dataPointsVisible={false}
                    hideAxis
                    hideXAxisLabels
                    hideYAxisLabels
                    lineWidth={Variables.border.width}
                    maxX={SPEED_CHART_MAX_LENGTH}
                    maxY={maxSpeed}
                    minX={0}
                    minY={0}
                    scatterPlotEnable={false}
                    style={styles.chart}
                />
            </View>
        );
    }
}

LineChart.defaultProps = {
    unit: UNIT_MEASUREMENT.MILES
};

LineChart.propTypes = {
    speed: PropTypes.number,
    unit: PropTypes.number,
    style: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ])
};
