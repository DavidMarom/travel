console.log('Main!');
import { storageService } from './services/storage.service.js'
import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { palcesService } from './services/places.service.js'
locService.getLocs()
    .then(locs => console.log('locs', locs))

window.onload = () => {
    palcesService.getUserPlaces()

    renderSavedPlaces()
    mapService.initMap()
        .then(() => {

            mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
        })
        .catch(console.log('INIT MAP ERROR'));

    locService.getPosition()
        .then(pos => {

            console.log('User position is:', pos.coords);
        })
        .catch(err => {
            console.log('Cannot get user-position', err);
        })
        // console.log(palcesService.getUserPlaces())

}

document.querySelector('.btn').addEventListener('click', (ev) => {
    console.log('Aha!', ev.target);
    mapService.panTo(35.6895, 139.6917);

})



document.querySelector('#map').addEventListener('contextmenu', (ev) => {
    debugger
    locService.getPosition()
        .then(ev => {
            console.log(ev.coords)
            palcesService.createPlace(ev.coords)
            renderSavedPlaces()
            // mapService.panTo(ev.GeolocationCoordinates.coords.latitude, ev.GeolocationCoordinates.coords.longitude)
        })
})
function renderSavedPlaces(){
    var savedPlaces = palcesService.getUserPlaces();
    const elSavedPlacesContainer = document.querySelector('.saved-places');
    var strHtml = savedPlaces.map( place =>{
        return `
        <div class ="saved-place" data-id="${place.id}">
        <h5>latitude: ${place.latitude}</5>
        <h5>longtitude: ${place.longtitude}</5>
        </div>
        
        `
    })
    elSavedPlacesContainer.innerHTML+= strHtml.join('');
}

//         // Create the initial InfoWindow.
//         var infoWindow = new google.maps.InfoWindow(
//             {content: 'Click the map to get Lat/Lng!', position: myLatlng});
//         infoWindow.open(map);

//         // Configure the click listener.
//         map.addListener('click', function(mapsMouseEvent) {
//           // Close the current InfoWindow.
//           infoWindow.close();

//           // Create a new InfoWindow.
//           infoWindow = new google.maps.InfoWindow({position: mapsMouseEvent.latLng});
//           infoWindow.setContent(mapsMouseEvent.latLng.toString());
//           infoWindow.open(map);
//         });


