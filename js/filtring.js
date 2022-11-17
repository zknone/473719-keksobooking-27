const quantityOfRenderedBubbles = 10;
// 1. собираем все кнопки которые есть в тулбаре под картой
const filterForm = document.querySelector('.map__filters');
const typeOfProperty = filterForm.querySelector('#housing-type');
const priceOfProperty = filterForm.querySelector('#housing-price');
const roomsQuantity = filterForm.querySelector('#housing-rooms');
const guestsCapacity = filterForm.querySelector('#housing-guests');
// const neededFeatures = filterForm.querySelector('#housing-features');

// 2. на событие изменения любых элементов формы, собираем текущие значения — событие где вызывается функция.

const filterActualResult = (field) => {
  field.addEventListener('change', () => {
    const actualField = field.value;
    if (actualField !== 'any') {
      //перестал передавать эни
      return (actualField);
    }
  });
};

//filterActualResult (с нужным параметром) нужно вызвать следующих функций
const filterPrice = (priceValue) => {
  if (priceValue === 'low') {
    // что отсекается return
  };
  if (priceValue === 'middle') {
    //что отсекается
  };
  if (priceValue === 'high') {
    // что отсекается все что либо равно 50 000
  };
};

const filterType = (typeValue) => {
  //эти значения впринципе едентичные. можно по ним отсекать. бунгало и прочая хуйня
};

const filterGuests = (typeValue) => {
//здесь фильтр идет по гестам
};

const filterCapacity = (typeCapacity) => {
//здесь фильтра по капейсити
};


const utiliseFilter = (initialPackage) => {
  const actualVariants = initialPackage;
  filterActualResult(typeOfProperty);
  filterActualResult(priceOfProperty);
  filterActualResult(roomsQuantity);
  filterActualResult(guestsCapacity);
  const processedPackage = actualVariants;
  return processedPackage;
};

// 3. фетчим с мейна джс данные
// 4. выделяем текущие активные критерии (2 и 4 одно и то же? ) —функция
// если вейлуе элемента не равно изначальному, то срабатывает фильтрация.
// дальше проверяется другой критерий
// передаем дальше оставшееся
// 5. проводим фильтрацию сфетченного массива — здесь выдается массив
// 6. отсекаем 10 штук
const filterOn = (packages) => {
  return utiliseFilter(packages).slice(0, quantityOfRenderedBubbles);
};
// 7. передаем его на рендеригг

export {
  filterOn
};
