import {
  resetMap,
  createMapMarkers
} from './map.js';

import {
  starterPoint
} from './map.js';
import {
  debounce,
  sendErrorMessage,
  sendSuccedMessage
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

const HeaderLength = {
  min: 30,
  max: 100
};

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

const postingAddress = 'https://27.javascript.pages.academy/keksobooking';

const deactivateForm = () => {
  adForm.classList.add('ad-form--disabled');
  adFormFieldsets.forEach((adFormFieldset) => {
    adFormFieldset.disabled = true;
  });
  adFormSlider.disabled = true;
  adFormSlider.classList.add('ad-form__slider--disabled');
  adFormMapFilters.disabled = true;
  adFormMapFilters.classList.add('map__filters--disabled');
};

const activateForm = () => {
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

const validateTitle = (value) => {
  const validation = value.length >= HeaderLength.min && value.length <= HeaderLength.max;
  return validation;
};

pristine.addValidator(
  adForm.querySelector('#title'),
  validateTitle,
  'От 30 до 100 символов!'
);

const validatePrice = (value) => {
  const unit = variants.querySelector(':checked');
  return parseInt(value, 10) <= maxPrice && parseInt(value, 10) >= minPrice[unit.value];
};

const getPriceErrorMessage = (value) => {
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

const checkRoomsAndCapacity = () => {
  const validation = allOptions[rooms.value].includes(Number(capacity.value));
  return validation;
};

const getCapacityErrorMessage = () => {
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

const onUnitChange = () => {
  actualProperty.placeholder = minPrice[this.value];
  pristine.validate(actualProperty);
};

adForm
  .querySelectorAll('#type')
  .forEach((item) => item.addEventListener('change', onUnitChange));

const onTimeInChange = () => {
  actualTimeOut.value = actualTimeIn.value;
  pristine.validate(actualTimeIn);
};

const onTimeOutChange = () => {
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

    fetch(postingAddress, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          sendSuccedMessage();
          resetForm();
          debounce(createMapMarkers(packages));
          activateForm();
        } else {
          sendErrorMessage();
          resetForm();
          debounce(createMapMarkers(packages));
          activateForm();
        }
      })
      .catch(() => {
        sendErrorMessage();
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
