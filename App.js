import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert, TouchableHighlight, Image, BackHandler } from 'react-native';
import Status from './components/Status';
import MessageList from './components/MessageList';
import { createTextMessage, createImageMessage, createLocationMessage } from './utils/messageUtils';
import Toolbar from './components/Toolbar';
import ImageGrid from './components/ImageGrid';

export default function App() {
  const [messages, setMessages] = useState([
    createImageMessage('https://unsplash.it/300/300'),
    createTextMessage('World'),
    createTextMessage('Hello'),
    createLocationMessage({
      latitude: 37.78825,
      longitude: -122.4324,
    }),
  ]);
  const [fullScreenImageId, setFullScreenImageId] = useState(null);
  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      if (setFullScreenImageId) {
        setFullScreenImageId(null);
        return true;
      }
      return false;
    });
  }, []);

  const handlePressToolbarCamera = () => {

  };

  const handlePressToolbarLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { coords : { latitude, longitude } } = position;
      setMessages([createLocationMessage(latitude, longitude), ...messages]);
    });
  };

  const handleSubmit = (text) => {
    setMessages([createTextMessage(text), ...messages]);
  };

  const handlePressMessage = ({ id, type }) => {
    switch (type) {
      case 'text':
        Alert.alert('Delete message?',
          'Are you sure you want to delete this message?', [
          {
            text: 'Cancel',
            style: 'cancel'
          },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => {
              setMessages(messages.filter(item => item.id !== id));
            }
          }
        ])
        break;

      case 'image':
        setFullScreenImageId(id);
        setIsInputFocused(false);
        break;

      default:
        break;
    }
  };

  const findImageFromId = () => {
    if (fullScreenImageId) {
      const image = messages.find(s => s.id === fullScreenImageId);
      console.log(image);
      if (image) return image.uri;
      return null;
    }
    return null;
  };

  return (
    <>
      <View style={styles.container}>
        <Status />
        <View style={styles.content}>
          <MessageList messages={messages} onPressMessage={handlePressMessage} />
        </View>
        <View style={styles.toolbar}>
          <View style={styles.toolbar}>
            <Toolbar
              isFocused={isInputFocused}
              onSubmit={handleSubmit}
              onChangeFocus={(isFocused) => setIsInputFocused(isFocused)}
              onPressCamera={handlePressToolbarCamera}
              onPressLocation={handlePressToolbarLocation}
            />
          </View>
        </View>
        <View style={styles.inputMethodEditor}>
          <ImageGrid />
        </View>
        {findImageFromId() !== null ? (<TouchableHighlight style={styles.fullscreenOverlay} onPress={() => setFullScreenImageId(null)}>
          <Image style={styles.fullscreenImage} source={{ uri: findImageFromId() }} />
        </TouchableHighlight>) : null}
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
  fullscreenOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    zIndex: 2,
  },
  fullscreenImage: {
    flex: 1,
    resizeMode: 'contain',
  },
});
