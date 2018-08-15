import * as actionTypes from './actionTypes';

export const addPlace = (placeName, location, image) => {
    return dispatch => {
        fetch('https://us-central1-social-places-1534271849784.cloudfunctions.net/storeImage', {
            method: 'POST',
            body: JSON.stringify({
                image: image.base64
            })
        })
        .catch(err => console.log(err))
        .then(res => res.json())
        .then(parsedRes => {
            const placeData = {
                name: placeName,
                location: location,
                image: parsedRes.imageUrl
            };
            return fetch('https://social-places-1534271849784.firebaseio.com/places.json', {
                method: "POST",
                body: JSON.stringify(placeData)
            })
        })
        .catch(err => console.log(err))
        .then(res => res.json())
        .then(parsedRes => {
            console.log(parsedRes);
        });
    };
};

export const deletePlace = (key) => {
    return {
        type: actionTypes.DELETE_PLACE,
        placeKey: key
    };
};