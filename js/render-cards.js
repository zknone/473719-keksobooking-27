import {
  getResult
} from './assemble.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const dataBase = getResult(10);
const cardList = document.querySelector('#map-canvas');

const offerTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const renderFeatures = function (cardElement, features) {
  const featuresList = cardElement.querySelector('.popup__features');
  const featuresItems = cardElement.querySelectorAll('.popup__feature');
  const modifiers = features.map((feature) => `popup__feature--${feature}`);
  featuresItems.forEach((featureItem) => {
    const modifier = featureItem.classList[1];
    if (!modifiers.includes(modifier)) {
      featureItem.remove();
    }
  });
};

dataBase.forEach((element) => {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = element.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = element.offer.adress;
  cardElement.querySelector('.popup__text--price').textContent = `${element.offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = offerTypes[element.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${element.offer.rooms} команты для ${element.offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`;
  renderFeatures(cardElement, element.offer.features);
  cardElement.querySelector('.popup__description').textContent = element.offer.description;
  cardElement.querySelector('.popup__photo').src = `${element.offer.photos}`;
  cardElement.querySelector('.popup__avatar').src = `${element.author.avatar}`;
  cardList.appendChild(cardElement);
});
