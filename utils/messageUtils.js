import uuid from 'uuidv4';

export function createTextMessage(text) {
    return {
        id: uuid(),
        type: 'text',
        text
    };
}

export function createImageMessage(uri) {
    return {
        type: 'image',
        id: uuid(),
        uri,
    };
}

export function createLocationMessage(coordinate) {
    return {
        type: 'location',
        id: uuid(),
        coordinate,
    };
}