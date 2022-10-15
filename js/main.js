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

const titleSet = [
  "Красивая комната в центре города",
  "Удобная квартира в исторической части города",
  "Квартира со всеми удобствами",
  "Апартаменты. 5 минут до центра",
  "Лучшее место для жизни",
  "Лучший вид в городе"
];

const typeOfProperty = [
  palace,
  flat,
  house,
  bungalow,
  hotel
]

const MAXROOMS = 7;
const MAXGUESTS = 6;
const MINPRICE = 10;
const MAXPRICE = 300;
const ROUNDINGTO = 5;
const MINLAT = 35.65000;
const MAXLAT = 35.70000;
const MINLNG = 139.70000;
const MAXLNG = 139.80000;

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

const descriptionVariants = [
  "Светлое просторное помещение, подойдет для самых превиредливых покупателей",
  "Квартира недалеко от исторического центра города, рядом много ресторанов, есть музеи",
  "Лучший вариант для тех, кто ищет спокойное место в одном из самых живописных районов города",
  "Специально для студентов и коммандировочных, предлагаю вам одну из комнат в своей просторной кварирте. Вы можете пользоваться кухней и стиральной машинкой, приходить когда вам угодно.",
  "Хорошее местечко для тех, кто приезжает в наш город поработать. В квартире есть рабочее место. Есть и кофе-машина. Интернет отличный.",
];

const photosLinks = [
  "https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg",
  "https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg",
  "https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg",
];

let randomiseFeatures = function(featuresList) {
  // делаем меньший массив
};

let generateLink = function () {
  // создаем хвост адреса
};

let getAdress = function (lat, lng) {
  // берем из объекта location адреса и пересобираем их по маске {{location.lat}}, {{location.lng}}
}

let author = {
  avatar: generateLink()
}

let offer = {
  // не забудь привести к правильным типам
  title: titleSet[[randomInteger(0, titleSet.length - 1)]],
  adress: getAdress(location.lat, location.lng),
  price: randomInteger (MINPRICE, MAXPRICE),
  type: typeOfProperty[randomInteger(0, typeOfProperty.length - 1)],
  rooms: randomInteger (1, MAXROOMS),
  guests: randomInteger (1, MAXGUESTS),
  checkin: checkIn[randomInteger(0, checkIn.length -1)],
  checkout: checkOut[randomInteger(0, checkOut.length -1)],
  features: randomiseFeatures(allFeatures),
  description: descriptionVariants[randomInteger(0, descriptionVariants.length -1)],
  photos: photosLinks[randomInteger(0, photosLinks.length -1)]
}

let location = {
  lat: randomCoordinatesInteger(MINLAT, MAXLAT, ROUNDINGTO),
  lng: randomCoordinatesInteger(MINLNG, MAXLNG, ROUNDINGTO)
}

console.log (location);
