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

dataBase.forEach((element) => {
  const cardElement = cardTemplate.cloneNode(true);
  //Выведите заголовок объявления offer.title в заголовок .popup__title
  cardElement.querySelector('.popup__title').textContent = element.offer.title;
  // Выведите адрес offer.address в блок .popup__text--address.
  cardElement.querySelector('.popup__text--address').textContent = element.offer.adress;
  // Выведите цену offer.price в блок .popup__text--price строкой вида {{offer.price}} ₽/ночь. Например, «5200 ₽/ночь».
  cardElement.querySelector('.popup__text--price').textContent = `${element.offer.price} ₽/ночь`;
  // В блок .popup__type выведите тип жилья offer.type, сопоставив с подписями: offerTypes
  cardElement.querySelector('.popup__type').textContent = offerTypes[element.offer.type];
  // Выведите количество гостей и комнат offer.rooms и offer.guests в блок .popup__text--capacity строкой вида {{offer.rooms}} комнаты для {{offer.guests}} гостей.
  //Например, «2 комнаты для 3 гостей».
  cardElement.querySelector('.popup__text--capacity').textContent = `${element.offer.rooms} команты для ${element.offer.guests} гостей`;
  //Время заезда и выезда offer.checkin и offer.checkout в блок .popup__text--time строкой вида Заезд после {{offer.checkin}}, выезд до {{offer.checkout}}.
  //Например, «Заезд после 14:00, выезд до 14:00».
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`;
  //В список .popup__features выведите все доступные удобства в объявлении.
  const featuresContainer = cardTemplate.querySelector('.popup__features');
  const featuresListing = featuresContainer.querySelectorAll('.popup__feature');
  featuresListing.forEach((featureListItem) => {
    const isNecessary = element.offer.features.some(
      (featureItem) => featureListItem.contains('popup__feature--' + featureItem),
      );
    if (!isNecessary) {
      featureListItem.remove();
    }
  });
  //В блок .popup__description выведите описание объекта недвижимости offer.description.
  cardElement.querySelector('.popup__description').textContent = element.offer.description;
  //В блок .popup__photos выведите все фотографии из списка offer.photos.
  //Каждая из строк массива photos должна записываться как атрибут src соответствующего изображения.
  cardElement.querySelector('.popup__photo').src = `${element.offer.photos}`;
  //Замените значение атрибута src у аватарки пользователя .popup__avatar на значение поля author.avatar.
  cardElement.querySelector('.popup__avatar').src = `${element.author.avatar}`;
  cardList.appendChild(cardElement);
});
