function randomInteger(min, max) {
  // получить случайное число –решение взял отсюда: https://learn.javascript.ru/task/random-int-min-max
  if (min < 0) {
    let random = NaN;
    return random;
  }

  if (max < 0) {
    let random = NaN;
    return random;
  }

  if (min > max) {
    let random = NaN;
    return random;
  }

  let random = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(random);
}

// eslint-disable-next-line no-console
console.log("Рандомное число - " + randomInteger(1, 100));


function randomCoordinatesInteger(min, max, roundingTo) {
  if (min < 0) {
    let randCoordinate = NaN;
    return randCoordinate;
  }

  if (max < 0) {
    let randCoordinate = NaN;
    return randCoordinate;
  }

  if (roundingTo < 0) {
    let randCoordinate = NaN;
    return randCoordinate;
  }

  if (min > max) {
    let randCoordinate = NaN;
    return randCoordinate;
  }

  // как проверка дробных чисел? Мы должны взять roundingTo и проверить с его помощью min и max. Надо просто посчитать количество знаков после запятой.
  // https://qna.habr.com/q/493201

  const lengthMin = min.toString().match(/\.(\d+)/)?.[1].length;
  console.log (lengthMin);
  const lengthMax = max.toString().match(/\.(\d+)/)?.[1].length;
  console.log (lengthMax);

  if (lengthMin != undefined)
    if (lengthMin > roundingTo) {
      let randCoordinate = NaN;
    return randCoordinate;
    }

  let multiplier = Math.pow(10, roundingTo);
  let randCoordinate = Math.round (min - 0.5 + Math.random() * (max - min + 1)*multiplier) / multiplier;
  return randCoordinate;
}

console.log("Рандомная координата - " + randomCoordinatesInteger(1.233, 999.77777777, 5));

// делитель для следующей функции вычисляет так. 10 возводим в степень roundingTo
// Рандом можно сделать так. В целом повторить всю процедуру, что выше. Но умножить цифры на roundingTo. Потом вычисленный результат поделить на это число. Так не понадобится даже округлять как-то.

/*
Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
Будет использоваться для генерации временных географических координат в следующем задании.
Пример использования функции:

имя_функции(от, до, количество_знаков_после_запятой);
// Результат: число с плавающей точкой из диапазона "от...до" с указанным "количеством знаков после запятой"
Учтите, что аргументами функции могут быть только положительные числа и ноль.
Если функции пришли неправильные аргументы, она должна вернуть NaN. Не забудьте,
что в случае с дробными числами диапазон может быть в десятых, сотых, тысячных и т. д. долях.
Например, 1.1, 1.2 — корректный диапазон.
Придумайте, как функция будет вести себя, если передать значение «до» меньшее,
чем значение «от», или равное ему. В этом случае вы можете вернуть NaN,
поменять аргументы местами или выбрать другой вариант.

Функция может не гарантировать верный результат, если в переданном диапазоне нет ни одного подходящего числа.
*/
