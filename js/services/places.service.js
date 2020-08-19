'use strict'
export const palcesService ={
    getUserPlaces,
    createPlace,
}
var gNextId = 0

// var gPlaces = loadFromStorage('Places') ? loadFromStorage('Places'): [];
var gPlaces = [1,2,3]

function getUserPlaces(){
    // gPlaces = loadFromStorage('Places')
    // if(!gPlaces) gPlaces = []
    return gPlaces
}

function createPlace(place){
    debugger
    const newPlace = {
        id:gNextId++,
        lat:place.latitude,
        lng:place.longitude
    }
    gPlaces.push(newPlace);
    saveToStorage('places',gPlaces);

}
