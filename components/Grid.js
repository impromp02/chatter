import React from 'react';
import { Dimensions, FlatList, PixelRatio } from 'react-native';

const Grid = (props) => {
    const { renderItem, numColumns, itemMargin } = props;
    
    const renderGridItem = (info) => {
        const { index } = info;
        const { width } = Dimensions.get('window');
        const size = PixelRatio.roundToNearestPixel((width - itemMargin * (numColumns - 1)) / numColumns);
        const marginLeft = index % numColumns === 0 ? 0 : itemMargin;
        const marginTop = index < numColumns ? 0 : itemMargin;
        return renderItem({ ...info, size, marginLeft, marginTop });
    };

    return (
        <FlatList
            {...props}
            renderItem={renderGridItem}
        />
    );
};

export default Grid;