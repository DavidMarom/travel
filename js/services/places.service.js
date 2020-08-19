export const placesService = {
    getUserPlaces,
    createPlace,
    setUserPlaces
}
var gNextId = 0

// var gPlaces = loadFromStorage('Places') ? loadFromStorage('Places'): [];
var gPlaces = [];

function setUserPlaces(val) {
    gPlaces=val;
}

function getUserPlaces() {
    return gPlaces;
}

function createPlace(place) {
    console.log('createPlaces: ', place);
    const newPlace = {
        id: gNextId++,
        lat: place.latitude,
        lng: place.longitude
    }
    gPlaces.push(newPlace);
    console.log('this is what gPlaces has right after push new palce')
    saveToStorage('places', gPlaces);
}