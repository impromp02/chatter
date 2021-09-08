import React, { useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import Grid from './Grid';

const keyExtractor = ({ uri }) => uri;

const ImageGrid = ({ onPressImage }) => {
    const [images, setImages] = useState([
        { uri: 'https://picsum.photos/600/600?image=10' },
        { uri: 'https://picsum.photos/600/600?image=20' },
        { uri: 'https://picsum.photos/600/600?image=30' },
        { uri: 'https://picsum.photos/600/600?image=40' },
    ]);

    const renderItem = ({ item: { uri }, size, marginTop, marginLeft }) => {
        const style = {
            width: size,
            height: size,
            marginLeft,
            marginTop
        };
        return <Image source={{ uri }} style={style} />
    };

    return (
        <Grid
            data={images}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
        />
    );
};

export default ImageGrid;

const styles = StyleSheet.create({
    image: {
        flex: 1,
    },
});