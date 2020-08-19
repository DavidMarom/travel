console.log('Main!');
import { storageService } from './services/storage.service.js'
import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { placesService } from './services/places.service.js'
locService.getLocs()
    .then(locs => console.log('locs', locs))

window.onload = () => {
  
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
    console.log(placesService.getUserPlaces());
    locService.getPosition()
        .then(ev => {
            placesService.createPlace(ev.coords)

            renderSavedPlaces()

            // mapService.panTo(ev.GeolocationCoordinates.coords.latitude, ev.GeolocationCoordinates.coords.longitude)
        })
})


function renderSavedPlaces(){
    var savedPlaces = placesService.getUserPlaces();
    const elSavedPlacesContainer = document.querySelector('.saved-places'); // catch DOM element
    var strHtml = savedPlaces.map( place =>{
        // console.log('place:' ,place);
        return `
        <div class="saved-place" data-id="${place.id}">
        <h5>latitude: ${place.lat}, longtitude: ${place.lng}</h5>
        <h5>Created at:${place.time} </h5>
        <button class="delete-btn" data-id="${place.id}"> X </button>
        </div>`
    })

    elSavedPlacesContainer.innerHTML ='';
    elSavedPlacesContainer.innerHTML= strHtml.join('');
    const elDeleteBtns = document.querySelectorAll('.delete-btn')
    elDeleteBtns.forEach(elBtn =>{
        elBtn.onclick = onDeletePlace
    })
}
function onDeletePlace(ev){
    const elBtn = ev.target
    placesService.deletePlace(+elBtn.dataset.id)
    renderSavedPlaces()
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


