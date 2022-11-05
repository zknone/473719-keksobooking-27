const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const adFormSlider = adForm.querySelector('.ad-form__slider');
const adFormMapFilters = document.querySelector('.map__filters');
const actualProperty = adForm.querySelector('#price');
const variants = adForm.querySelector('#type');
const unit = variants.querySelector(':checked');

const maxPrice = 100000;
const minPrice = {
  'flat': 1000,
  'bungalow': 0,
  'house': 5000,
  'palace': 100000,
  'hotel': 3000,
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
  return parseInt(value, 10) < maxPrice && parseInt(value, 10) > minPrice[unit.value];
};

const getPriceErrorMessage = function (value) {
  if (parseInt(value, 10) > maxPrice) {
    return `Не может стоить больше ${maxPrice} рублей`;
  }
  if (minPrice[unit.value] > 0 && parseInt(value, 10) < minPrice[unit.value]) {
    return `Не может стоить меньше ${minPrice[unit.value]} рублей`;
  }
}; // откуда берем value?

pristine.addValidator(
  actualProperty,
  validatePrice,
  getPriceErrorMessage,
);

const checkRoomsAndCapacity = function () {
  const rooms = adForm.querySelector('#room_number');
  const roomUnit = rooms.querySelector(':checked');
  const capacity = adForm.querySelector('#capacity');
  const capacityUnit = capacity.querySelector(':checked');
  return roomUnit.value >= capacityUnit.value;
};

// const getCapacityErrorMessage = function () {
//   const rooms = adForm.querySelector('#room_number');
//   const roomUnit = rooms.querySelector(':checked');
//   const capacity = adForm.querySelector('#capacity');
//   const capacityUnit = capacity.querySelector(':checked');

//   if (roomUnit.value === 0 && capacityUnit.value !== roomUnit.value) {
//     return `Не предзазначенная для проживания площадь`;
//   }
//   if (roomUnit.value > capacityUnit.value) {
//     return `В ${roomUnit} комнате/ах не может проживать ${capacityUnit} человек/а`;
//   }
// };

pristine.addValidator(
  adForm.querySelector('#capacity'),
  checkRoomsAndCapacity,
  // getCapacityErrorMessage,
  'слишком много гостей.',
);

const onUnitChange = function () {
  actualProperty.placeholder = minPrice[this.value];
  pristine.validate(actualProperty);
};

adForm
  .querySelectorAll('#type')
  .forEach((item) => item.addEventListener('change', onUnitChange));

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

export {
  deactivateForm
};
export {
  activateForm
};
