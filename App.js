import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Status from './components/Status';

export default function App() {
  return (
    <>
      <View style={styles.container}>
        <Status />
        <View style={styles.content}></View>
        <View style={styles.toolbar}></View>
        <View style={styles.inputMethodEditor}></View>
      </View>
      {/* <StatusBar /> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputMethodEditor: {
    flex: 1,
    backgroundColor: 'white',
  }, toolbar: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.04)',
    backgroundColor: 'white',
  },
});
