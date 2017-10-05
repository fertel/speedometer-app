import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import PropTypes from 'prop-types';
import { Variables } from '../assets/styles/variables';

const styles = StyleSheet.create({
    container: {
        backgroundColor: Variables.colors.primary.darken(0.3),
        flex: 1
    }
});

export class SidebarMenu extends Component {

    render() {
        const { style } = this.props;

        return (
            <View style={[styles.container, style]}></View>
        );
    }
}

SidebarMenu.defaultProps = {

};

SidebarMenu.propTypes = {
    style: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ])
};
