import './render-cards.js';
import {
  dataBase
} from './render-cards.js';
import {
  createCard
} from './render-cards.js';

const chosenAddress = document.querySelector('#address');
const starterPoint = {
  lat: 35.652832,
  lng: 139.839478,
};

const regularIconAchor = [20, 40];
const regularIconSize = [40, 40];
const regularIconUrl = './img/pin.svg';

const mainIconUrl = './img/main-pin.svg';
const mainIconSize = [52, 52];
const mainIconAnchor = [26, 52];

const map = L.map('map-canvas')
  .on('load', () => {
    //карта инициализирована
  })
  .setView(starterPoint, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: mainIconUrl,
  iconSize: mainIconSize,
  iconAnchor: mainIconAnchor,
});

const icon = L.icon({
  iconUrl: regularIconUrl,
  iconSize: regularIconSize,
  iconAnchor: regularIconAchor,
});

const mainPinMarker = L.marker(starterPoint, {
  draggable: true,
  icon: mainPinIcon,
}, );

dataBase.forEach((dataUnit) => {
  const marker = L.marker(dataUnit.location, {
    icon,
  });

  marker
    .addTo(map)
    .bindPopup(createCard(dataUnit));
});

chosenAddress.value = `LatLng(${starterPoint.lat}, ${starterPoint.lng})`;

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  chosenAddress.value = evt.target.getLatLng();
});
