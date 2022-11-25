const ESCAPE_KEY = 'Escape';

const isEscKey = (evt) => {
  const pressedKey = evt.key;
  return (pressedKey === ESCAPE_KEY);
};

export {
  isEscKey
};
