const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const adFormSlider = adForm.querySelector('.ad-form__slider');
const adFormMapFilters = document.querySelector('.map__filters');

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

const actualProperty = adForm.querySelector('#price');
const maxPrice = 100000;
const minPrice = {
  'flat': 1000,
  'bungalow': 0,
  'house': 5000,
  'palace': 100000,
  'hotel': 3000,
};

const validatePrice = function (value) {
  const variants = adForm.querySelector('#type');
  const unit = variants.querySelector(':checked');
  return parseInt(value, 10) < maxPrice && parseInt(value, 10) > minPrice[unit.value];
};

const getPriceErrorMessage = function (value) {
  const variants = adForm.querySelector('#type');
  const unit = variants.querySelector(':checked');
  if (parseInt(value, 10) > maxPrice) {return `Не может стоить больше ${maxPrice} рублей`;}
  if (minPrice[unit.value] > 0 && parseInt(value, 10) < minPrice[unit.value]) {return `Не может стоить меньше ${minPrice[unit.value]} рублей`;}
};

pristine.addValidator(
  actualProperty,
  validatePrice,
  getPriceErrorMessage,
);

const onUnitChange = function () {
  actualProperty.placeholder = minPrice[this.value];
  pristine.validate(actualProperty);
};

adForm
  .querySelectorAll('#type')
  .forEach((item) => item.addEventListener('change', onUnitChange));

//  Поле «Количество комнат» синхронизировано с полем «Количество мест» таким образом, что при выборе количества комнат вводятся ограничения на допустимые варианты выбора количества гостей:
// 1 комната — «для 1 гостя»;
// 2 комнаты — «для 2 гостей» или «для 1 гостя»;
// 3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»;
// 100 комнат — «не для гостей».

const checkRoomsAndCapacity = function () {
  const rooms = adForm.querySelector('#rooms');
  const roomUnit = rooms.querySelector(':checked');
  const capacity = adForm.querySelector('#capacity');
  const capacityUnit = capacity.querySelector(':checked');
  //тут нужно добавить словарь
};

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
