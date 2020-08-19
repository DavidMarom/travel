export const placesService = {
    getUserPlaces,
    createPlace,
    setUserPlaces,
    addToCords
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

function addToCords(add) {
    $.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${add}&key=AIzaSyBdL0KlYTebDJUak4_QskhFhHZX7OuIOhU`, putAddress);
}

function putAddress(res) {
    console.log(res);
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