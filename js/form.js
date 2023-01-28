//form validation and interactions
import {
  resetMap,
  createMapMarkers
} from './map.js';

import {
  starterPoint
} from './map.js';
import {
  debounce,
  messageError,
  messageSucced
} from './utils.js';

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


const maxPrice = 100000;
const minPrice = {
  'flat': 1000,
  'bungalow': 0,
  'house': 5000,
  'palace': 10000,
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
    min: minPrice[variants.value],
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

const onFormSubmit = (packages) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
    const formData = new FormData(evt.target);
    deactivateForm();
    fetch('https://27.javascript.pages.academy/keksobooking', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          messageSucced();
          resetForm();
          debounce(createMapMarkers(packages));
          activateForm();
        } else {
          messageError();
          resetForm();
          debounce(createMapMarkers(packages));
          activateForm();
        }
      })
      .catch(() => {
        messageError();
        resetForm();
        debounce(createMapMarkers(packages));
        activateForm();
      });
  });
};

const onResetButton = (packages) => {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetForm();
    debounce(createMapMarkers(packages));
  });
};

export {
  deactivateForm,
  activateForm,
  onResetButton,
  onFormSubmit
};
