import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { DIRECTIONS, FadeInDirectionView } from '../animations/fade-in-direction-view';
import React, { Component } from 'react';

import { Constants } from 'expo';
import PropTypes from 'prop-types';
import { Variables } from '../../assets/styles/variables';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        paddingBottom: Variables.spacer.base,
        paddingHorizontal: Variables.spacer.base,
        paddingTop: Constants.statusBarHeight + Variables.spacer.base
    },
    activityIndictator: {
        height: 32,
        marginBottom: Variables.spacer.base / 2
    },
    text: {
        color: Variables.colors.white,
        fontFamily: Variables.fonts.sansSerif.medium,
        fontSize: Variables.fontSizes.medium,
        lineHeight: Variables.lineHeights.medium
    }
});

export class PreloaderScreen extends Component {

    render() {
        const { loadingMessage, backgroundColor } = this.props;

        return (
            <View style={[styles.container, { backgroundColor }]}>
                <FadeInDirectionView
                    animateOnUpdate={false}
                    direction={DIRECTIONS.UP}
                >
                    <ActivityIndicator
                        animating
                        color={Variables.colors.white}
                        size={'large'}
                        style={styles.activityIndictator}
                    />
                </FadeInDirectionView>
                <FadeInDirectionView
                    animateOnUpdate={false}
                    delay={Variables.animations.durationBase / 6}
                    direction={DIRECTIONS.UP}
                >
                    <Text style={styles.text}>{loadingMessage}</Text>
                </FadeInDirectionView>
            </View>
        );
    }
}

PreloaderScreen.defaultProps = {
    loadingMessage: 'Loading...',
    backgroundColor: Variables.colors.loading
};

PreloaderScreen.propTypes = {
    backgroundColor: PropTypes.object,
    loadingMessage: PropTypes.string
};
