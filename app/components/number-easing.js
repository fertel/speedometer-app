import  React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Text } from 'react-native';
import TimerMixin from 'react-timer-mixin';
import eases from 'eases';

export class NumberEasing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            previousValue: 0,
            displayValue: 0
        };

        this.timeout = null;
        this.startAnimationTime = null;
        this.updateNumber = this.updateNumber.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { displayValue } = this.state;
        const { delayValue } = this.props;
        const value = parseInt(this.props.value, 10);

        if (parseInt(nextProps.value, 10) === value) return;

        this.setState({ previousValue: displayValue });

        if (!isNaN(parseInt(delayValue, 10))) {
            this.delayTimeout = setTimeout(() => {
                this.startAnimationTime = (new Date()).getTime();
                this.updateNumber();
            }, delayValue);
        } else {
            this.startAnimationTime = (new Date()).getTime();
            this.updateNumber();
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.displayValue !== this.state.displayValue;
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
        clearTimeout(this.delayTimeout);
    }

    updateNumber() {
        const { ease, speed } = this.props;
        const { previousValue } = this.state;

        const value = parseInt(this.props.value, 10);
        const now = (new Date()).getTime();
        const elapsedTime = Math.min(speed, (now - this.startAnimationTime));
        const progress = eases[ease](elapsedTime / speed);
        const currentDisplayValue = Math.round((value - previousValue) * progress + previousValue);

        this.setState({ displayValue: currentDisplayValue });

        if (elapsedTime < speed) {
            this.timeout = setTimeout(this.updateNumber, 16);
        } else {
            this.setState({ previousValue: value });
        }
    }

    render() {
        const { style, useLocaleString } = this.props;
        const { displayValue } = this.state;

        return (
            <Text style={style}>{useLocaleString ? displayValue.toLocaleString() : displayValue}</Text>
        );
    }
}

NumberEasing.defaultProps = {
    ease: 'quintInOut',
    speed: 500,
    useLocaleString: false
};

NumberEasing.propTypes = {
    delayValue: PropTypes.number,
    ease: PropTypes.oneOf(Object.keys(eases)),
    speed: PropTypes.number,
    style: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ]),
    useLocaleString: PropTypes.bool,
    value: PropTypes.any.isRequired
};
