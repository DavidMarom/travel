export const placesService = {
    getUserPlaces,
    createPlace,
    setUserPlaces,
    addToCords,
    deletePlace
}
var gNextId = 0

// var gPlaces = loadFromStorage('Places') ? loadFromStorage('Places'): [];
var gPlaces;

function setUserPlaces(val) {
    gPlaces = val;
}

function getUserPlaces() {
    if (!gPlaces) {
        gPlaces = loadFromStorage('places')
        if (!gPlaces) {
            gPlaces = []
            saveToStorage(gPlaces, 'places')
        }
    }
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
    var time = new Date
    const newPlace = {
        id: gNextId++,
        lat: place.latitude,
        lng: place.longitude,
        time:time
    }
    gPlaces.push(newPlace);
    console.log('this is what gPlaces has right after push new palce')
    saveToStorage('places', gPlaces);
}
function deletePlace(placeId){
    console.log(placeId)
    console.log(gPlaces)
    gPlaces = gPlaces.filter(place =>{
        return place.id !== placeId
    })
}