function randomInteger(min, max) {
  // получить случайное число –решение взял отсюда: https://learn.javascript.ru/task/random-int-min-max
  if (min < 0 || max < 0 || min > max) {
    return NaN;
  }

  let random = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(random);
}


function randomCoordinatesInteger(min, max, roundingTo) {
  if (min < 0 || max < 0 || roundingTo < 0 || min > max) {
    return NaN;
  }

  const minRounded = min.toFixed(roundingTo);
  const maxRounded = max.toFixed(roundingTo);

  let multiplier = Math.pow(10, roundingTo);
  let randomCoordinate = Math.round(minRounded - 0.5 + Math.random() * (maxRounded - minRounded + 1) * multiplier) / multiplier;
  return randomCoordinate;
}

const price = randomInteger (10, 300);

const type = [
  palace,
  flat,
  house,
  bungalow,
  hotel
]

const rooms = randomInteger (1, 7);
const guest = randomInteger (1, 6);

const checkIn = [
  "12:00",
  "13:00",
  "14:00"
];
const checkOut = [
  "12:00",
  "13:00",
  "14:00"
];

const allFeatures  = [
  "wifi",
  "dishwasher",
  "parking",
  "washer",
  "elevator",
  "conditioner"
];


let randomFeatures = function(featuresList) {
  // делаем меньший массив
};

let author = {
  avatar: ""
}

let offer = {
  title: "",
  adress: [],
  price: price,
  type: type[randomInteger(0, TYPE.length - 1)],
  rooms: rooms,
  guests: guests,
  checkin: checkIn[randomInteger(0, CHECKIN.length -1)],
  checkout: checkOut[randomInteger(0, CHECKIN.length -1)],
  features: randomFeatures(allFeatures),
  description: "",
  photos: "",
}

let location = {
  lat: 0,
  lng: 0
}
