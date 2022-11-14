import {
  resetMap
} from './map.js';
import {
  starterPoint
} from './main.js';

const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const adFormSlider = adForm.querySelector('.ad-form__slider');
const adFormMapFilters = document.querySelector('.map__filters');
const actualProperty = adForm.querySelector('#price');
const variants = adForm.querySelector('#type');
const rooms = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const actualTimeIn = adForm.querySelector('#timein');
const actualTimeOut = adForm.querySelector('#timeout');
const resetButton = adForm.querySelector('.ad-form__reset');
const bodyElement = document.querySelector('body');

const maxPrice = 100000;
const minPrice = {
  'flat': 1000,
  'bungalow': 0,
  'house': 5000,
  'palace': 100000,
  'hotel': 3000,
};

const allOptions = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const deactivateForm = function () {
  adForm.classList.add('ad-form--disabled');
  adFormFieldsets.forEach((adFormFieldset) => {
    adFormFieldset.disabled = true;
  });
  adFormSlider.disabled = true;
  adFormSlider.classList.add('ad-form__slider--disabled');
  adFormMapFilters.disabled = true;
  adFormMapFilters.classList.add('map__filters--disabled');
};

const activateForm = function () {
  adForm.classList.remove('ad-form--disabled');
  adFormFieldsets.forEach((adFormFieldset) => {
    adFormFieldset.disabled = false;
  });
  adFormSlider.disabled = false;
  adFormSlider.classList.remove('ad-form__slider--disabled');
  adFormMapFilters.disabled = false;
  adFormMapFilters.classList.remove('map__filters--disabled');
};

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
  errorClass: 'ad-form--invalid',
  succesClass: 'ad-form--valid',
  errorTextTag: 'span',
});

const validateTitle = function (value) {
  return value.length >= 30 && value.length <= 100;
};

pristine.addValidator(
  adForm.querySelector('#title'),
  validateTitle,
  'От 30 до 100 символов!'
);

const validatePrice = function (value) {
  const unit = variants.querySelector(':checked');
  return parseInt(value, 10) <= maxPrice && parseInt(value, 10) >= minPrice[unit.value];
};

const getPriceErrorMessage = function (value) {
  const unit = variants.querySelector(':checked');
  if (parseInt(value, 10) > maxPrice) {
    return `Не может стоить больше ${maxPrice} рублей`;
  }
  if (minPrice[unit.value] > 0 && parseInt(value, 10) < minPrice[unit.value]) {
    return `Не может стоить меньше ${minPrice[unit.value]} рублей`;
  }
};

pristine.addValidator(
  actualProperty,
  validatePrice,
  getPriceErrorMessage,
);

const checkRoomsAndCapacity = function () {
  return allOptions[rooms.value].includes(Number(capacity.value));
};

const getCapacityErrorMessage = function () {
  if (rooms.value === '100' && capacity.value !== '0') {
    return 'Не предзазначенная для проживания площадь';
  }
  if (rooms.value !== '100' && rooms.value < capacity.value) {
    return `В ${rooms.value} комнате/ах не может проживать ${capacity.value} человек/а`;
  }
};

pristine.addValidator(
  rooms,
  checkRoomsAndCapacity,
  getCapacityErrorMessage,
);

pristine.addValidator(
  capacity,
  checkRoomsAndCapacity,
  getCapacityErrorMessage,
);

const onUnitChange = function () {
  actualProperty.placeholder = minPrice[this.value];
  pristine.validate(actualProperty);
};

// const removeSpanFromCapacity = function () {
//   const fieldCapacity = adForm.querySelector('#capacity');
//   const spanToDelete = fieldCapacity.nextSibling;
//   spanToDelete.remove();
// };

// const removeSpanFromRooms = function () {
//   const fieldRooms = adForm.querySelector('#rooms');
//   const spanToDelete = fieldRooms.nextSibling;
//   spanToDelete.remove();
// };

// adForm
//   .querySelectorAll('#rooms')
//   .forEach((item) => item.addEventListener('change', removeSpanFromCapacity));

// adForm
//   .querySelectorAll('#capacity')
//   .forEach((item) => item.addEventListener('change', removeSpanFromRooms));

adForm
  .querySelectorAll('#type')
  .forEach((item) => item.addEventListener('change', onUnitChange));

const onTimeInChange = function () {
  actualTimeOut.value = actualTimeIn.value;
  pristine.validate(actualTimeIn);
};

const onTimeOutChange = function () {
  actualTimeIn.value = actualTimeOut.value;
  pristine.validate(actualTimeOut);
};

adForm
  .querySelectorAll('#timein')
  .forEach((item) => item.addEventListener('change', onTimeInChange));

adForm
  .querySelectorAll('#timeout')
  .forEach((item) => item.addEventListener('change', onTimeOutChange));

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

const sliderElement = document.querySelector('.ad-form__slider');
let minPropertyPrice = minPrice[variants.value];

noUiSlider.create(sliderElement, {
  range: {
    min: minPropertyPrice,
    max: maxPrice,
  },
  start: minPropertyPrice,
  step: 100,
  connect: 'lower',
});

sliderElement.noUiSlider.on('update', () => {
  actualProperty.value = sliderElement.noUiSlider.get();
  pristine.validate(actualProperty);
});

variants.addEventListener('change', () => {
  minPropertyPrice = minPrice[variants.value];
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: minPropertyPrice,
      max: maxPrice,
    },
    start: minPropertyPrice,
    step: 100
  });
});

const resetForm = () => {
  adForm.reset();
  sliderElement.noUiSlider.set(actualProperty.value);
  resetMap(starterPoint);
};

const messageSucced = () => {
  const okMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  const okMessage = okMessageTemplate.cloneNode(true);
  bodyElement.appendChild(okMessage);
  setTimeout(() => {
    okMessage.remove();
    // убираем обработчик с документа
  }, 5000);
  okMessage.addEventListener('click', () => {
    okMessage.remove();
    //убираю обработчик события c документа
    //вызвать клир тайм аут
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      okMessage.remove();
      //убираю обработчик события c документа
      //вызвать клир тайм аут
    }
  });
};

const messageError = () => {
  const errorsMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorsMessage = errorsMessageTemplate.cloneNode(true);
  bodyElement.appendChild(errorsMessage);
  document.addEventListener('click', () => {
    errorsMessage.remove();
    //убираю оба обработчика события c документа
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      errorsMessage.remove();
      //убираю оба обработчик события c документа

      //убираем обработчики с других вещей
    }
  });
};

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    const formData = new FormData(evt.target);

    fetch('https://27.javascript.pages.academy/keksobooking', {
      method: 'POST',
      body: formData,
    });
    messageSucced(); // фетч не правильно сделал, должен быть then
    resetForm();
  } else { //catch... else не нужен, нужно в кетч
    messageError();
    resetForm();
  }
});

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

export {
  deactivateForm
};
export {
  activateForm
};
