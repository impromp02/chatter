import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import ToolbarButton from './ToolbarButton';

const Toolbar = ({ onPressCamera, onPressLocation, onSubmit, onChangeFocus, isFocused }) => {
    const [text, setText] = useState('');
    const inputRef = useRef(null);

    const handleTextSubmit = () => {
        if (text) {
            onSubmit(text);
            setText('');
        }
    };

    useEffect(() => {
        if(isFocused) inputRef.current.focus();
        else inputRef.current.blur();
    }, [isFocused]);

    return <View style={styles.toolbar}>
        <ToolbarButton
            title='C'
            onPress={onPressCamera}
        />
        <ToolbarButton
            title='L'
            onPress={onPressLocation}
        />
        <View style={styles.inputContainer}>
            <TextInput
                ref={inputRef}
                style={styles.input}
                underlineColorAndroid={'transparent'}
                placeholder={'Type something!'}
                blurOnSubmit={false}
                value={text}
                onChangeText={text => setText(text)}
                onSubmitEditing={handleTextSubmit}
                onFocus={() => onChangeFocus(true)}
                onBlur={() => onChangeFocus(false)}
            />
        </View>
    </View>;
};

export default Toolbar;

const styles = StyleSheet.create({
    toolbar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        paddingLeft: 16,
        backgroundColor: 'white',
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.04)', borderRadius: 16,
        paddingVertical: 4, paddingHorizontal: 12, backgroundColor: 'rgba(0,0,0,0.02)',
    }, input: {
        flex: 1,
        fontSize: 18,
    },
});