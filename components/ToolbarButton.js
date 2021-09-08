import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

const ToolbarButton = ({ title, onPress }) => {
    return <TouchableOpacity onPress={onPress}>
        <Text style={styles.button}>{title}</Text>
    </TouchableOpacity>
};

export default ToolbarButton;

const styles = StyleSheet.create({
    button: {
        top: -2,
        marginRight: 12,
        fontSize: 20,
        color: 'grey',
    },
});