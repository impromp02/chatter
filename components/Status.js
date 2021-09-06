import React, { useEffect, useState } from 'react';
import { Constants } from 'expo';
import { StyleSheet, Platform, Text, View, StatusBar } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const statusHeight = Platform.OS === 'ios' ? Constants.statusBarHeight : 0;

function Status() {
    // Initializing state to track newtwork connectivity
    // and rendering status bar based on these state
    const [isConnected, setIsConnected] = useState(false);
    const [networkType, setNetworkType] = useState('none');

    useEffect(() => {
        const handleNetworkChange = (state) => {
            console.log(JSON.stringify(state));
            setIsConnected(state.isConnected);
            setNetworkType(state.type);
        };

        // Fetch inital network status
        (async () => {
            const state = await NetInfo.fetch();
            handleNetworkChange(state);
        })();

        // attach a event callback for any network change
        const netSubscription = NetInfo.addEventListener(state => {
            handleNetworkChange(state);
        });

        // unsubscribe the event handler
        return netSubscription;
    }, []);

    const backgroundColor = isConnected ? 'white' : 'red';

    const messageContainer = (
        <View style={styles.messageContainer} pointerEvents='none'>
            <StatusBar
                backgroundColor={backgroundColor}
                barStyle={isConnected ? 'dark-content' : 'light-content'}
                animated={false}
            />
            {
                !isConnected && (
                    <View style={styles.bubble}>
                        <Text style={styles.text}>No network connection</Text>
                    </View>
                )
            }
        </View>
    );

    if (Platform.OS === 'ios') {
        return <View style={[styles.status, { backgroundColor }]}>
            {messageContainer}
        </View>
    }

    return messageContainer;
}

export default Status;

const styles = StyleSheet.create({
    status: {
        zIndex: 1,
        height: statusHeight,
    },
    messageContainer: {
        zIndex: 1,
        position: 'absolute',
        top: statusHeight + 20,
        right: 0,
        left: 0,
        height: 80,
        alignItems: 'center',
    },
    bubble: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: 'red',
    },
    text: {
        color: 'white',
    },
})