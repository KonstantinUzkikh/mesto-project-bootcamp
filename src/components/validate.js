function showInputError (formElement, inputElement, settings) {
  const errorElement = formElement.querySelector(`.popup__input-error_${inputElement.id}`);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(settings.errorClass);
  inputElement.classList.add(settings.inputErrorClass);
};

function hideInputError (formElement, inputElement, settings) {
  const errorElement = formElement.querySelector(`.popup__input-error_${inputElement.id}`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
};

function checkValidity (formElement, inputElement, settings) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

function hasInvalidInput (arrayInputs) {
  return arrayInputs.some((inputElement) => {return !inputElement.validity.valid})
};

function resetInputErrors (formElement, settings) {
  const inputsArray = Array.from(formElement.querySelectorAll(settings.inputSelector));
  inputsArray.forEach((inputElement) => hideInputError(formElement, inputElement, settings));
}

function toggleButtonState (arrayInputs, buttonElement, settings) {
  if (hasInvalidInput(arrayInputs, settings)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
};

function setListenersErrors (formElement, settings) {
  const inputsArray = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const button = formElement.querySelector(settings.submitButtonSelector);
  inputsArray.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkValidity(formElement, inputElement, settings);
      toggleButtonState (inputsArray, button, settings);
    });
  });
}

function enableValidation (settings) {
  const arrayForms = Array.from(document.querySelectorAll(settings.formSelector));
  arrayForms.forEach((formElement) => setListenersErrors(formElement, settings));
};

export {enableValidation, resetInputErrors, toggleButtonState}
