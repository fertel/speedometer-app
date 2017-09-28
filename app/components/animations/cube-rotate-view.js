import { Animated, Easing, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { Variables, isAndroid } from '../../assets/styles/variables';

import Dimensions from 'Dimensions';
import PropTypes from 'prop-types';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: height,
        width: width
    }
});

export class CubeRotateView extends Component {

    constructor(props) {
        super(props);

        this.animate = this.animate.bind(this);
        this.getChildOverlayOpacity = this.getChildOverlayOpacity.bind(this);
        this.getChildTransforms = this.getChildTransforms.bind(this);
        this.getChildTransformsAndroid = this.getChildTransformsAndroid.bind(this);
        this.getChildTransformsIOS = this.getChildTransformsIOS.bind(this);
        this.renderChild = this.renderChild.bind(this);
    }

    componentWillMount() {
        const { animateToIndex } = this.props;
        this.animation = new Animated.Value(animateToIndex);
    }

    componentWillReceiveProps(nextProps) {
        const { animateToIndex } = nextProps;
        this.animate(animateToIndex);
    }

    animate(index) {
        const toValue = width * index;

        Animated.timing(this.animation, {
            duration: Variables.animations.durationBase,
            easing: Variables.animations.defaultEasing,
            toValue: toValue,
            useNativeDriver: true
        }).start();
    }

    getChildOverlayOpacity(index) {
        const animation = this.animation;
        const pageX = width * index;

        const opacity = animation.interpolate({
            inputRange: [pageX - width, pageX, pageX + width],
            outputRange: [0.5, 0, 0.5]
        });

        return { opacity };
    }

    getChildTransforms(index) {
        if (isAndroid) return this.getChildTransformsAndroid(index);
        return this.getChildTransformsIOS(index);
    }

    getChildTransformsAndroid(index) {
        const pageX = width * index;

        const translateX = this.animation.interpolate({
            inputRange: [pageX - width, pageX, pageX + width],
            outputRange: [width, 0, -width],
            extrapolate: 'clamp'
        });

        return { transform: [{ translateX }] };
    }

    getChildTransformsIOS(index) {
        const pageX = width * index;

        const translateX = this.animation.interpolate({
            inputRange: [pageX - width, pageX, pageX + width],
            outputRange: [width / 2, 0, -width / 2],
            extrapolate: 'clamp'
        });

        const rotateY = this.animation.interpolate({
            inputRange: [pageX - width, pageX, pageX + width],
            outputRange: ['59deg', '0deg', '-59deg'],
            extrapolate: 'clamp'
        });

        const translateXAfterRotate = this.animation.interpolate({
            inputRange: [
                pageX - width,
                pageX - width + 1,
                pageX,
                pageX + width - 1,
                pageX + width
            ],
            outputRange: [
                width,
                width / 2.35,
                0,
                -width / 2.35,
                -width
            ]
        });

        // TODO: Research why the order of these props matter
        // in the transform property
        return {
            transform: [
                { perspective: width },
                { translateX },
                { rotateY },
                { translateX: translateXAfterRotate }
            ]
        };
    }

    renderChild(child, index) {

        return (
            <Animated.View
                key={index}
                style={[StyleSheet.absoluteFill, this.getChildTransforms(index)]}
            >
                {child}
                <Animated.View pointerEvents={'none'} style={[
                    StyleSheet.absoluteFill,
                    {backgroundColor: Variables.colors.black},
                    this.getChildOverlayOpacity(index)
                ]}/>
            </Animated.View>
        );
    }

    render() {
        const { children } = this.props;

        // TODO: this should be it's own animation
        // and it should fire each rotate, currently
        // only fires on first side spin, might not even
        // need the scale transform
        // const interpolatedScale = this.animation.interpolate({
        //     inputRange: [0, width / 2, width],
        //     outputRange: [1, .9, 1]
        // });

        return (
            // <Animated.View style={[
            //     styles.container, { transform: [{ scale: interpolatedScale }]}
            // ]}>
            <Animated.View style={styles.container}>
                {children.length > 1 && children.map(this.renderChild)}
            </Animated.View>
        );
    }
}

CubeRotateView.defaultProps = {
    animateToIndex: 0
};

CubeRotateView.propTypes = {
    animateToIndex: PropTypes.number,
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ])
};
