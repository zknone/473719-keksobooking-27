function debounce(callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

function throttle(callback, delayBetweenFrames) {
  let lastTime = 0;

  return (...rest) => {
    const now = new Date();
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

const okMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const okMessage = okMessageTemplate.cloneNode(true);
const errorsMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const errorsMessage = errorsMessageTemplate.cloneNode(true);
const bodyElement = document.querySelector('body');

const onOkMessageEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    okMessage.remove();
    document.removeEventListener('keydown', onOkMessageEscKeydown);
  }
};

const onErrorMessageEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    errorsMessage.remove();
    document.removeEventListener('keydown', onErrorMessageEscKeydown);
  }
};

const onOkMessageModalClick = () => {
  okMessage.remove();
  okMessage.removeEventListener('click', onOkMessageEscKeydown);
};

const onErrorMessageModalClick = () => {
  errorsMessage.remove();
  errorsMessage.removeEventListener('click', onErrorMessageEscKeydown);
};

const sendSuccedMessage = () => {
  bodyElement.appendChild(okMessage);
  setTimeout(() => {
    okMessage.remove();
    document.removeEventListener('keydown', onOkMessageEscKeydown);
  }, 5000);
  okMessage.addEventListener('click', onOkMessageModalClick);
  document.addEventListener('keydown', onOkMessageEscKeydown);
};

const sendErrorMessage = () => {
  bodyElement.appendChild(errorsMessage);
  document.addEventListener('click', onErrorMessageModalClick);
  document.addEventListener('keydown', onErrorMessageEscKeydown);
};

export {
  debounce,
  throttle,
  sendErrorMessage,
  sendSuccedMessage
};
