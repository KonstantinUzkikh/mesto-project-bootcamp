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

function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {return !inputElement.validity.valid})
};

function resetInputErrors (formElement, settings) {
  const inputsArray = Array.from(formElement.querySelectorAll(settings.inputSelector));
  inputsArray.forEach((inputElement) => hideInputError(formElement, inputElement, settings));
}

function setButtonActivity (button, state, settings) {
  if (state) {
    button.removeAttribute('disabled');
    button.classList.remove(settings.inactiveButtonClass);
  } else {
    button.setAttribute('disabled', true);
    button.classList.add(settings.inactiveButtonClass);
  }
};

function toggleButtonState (inputList, buttonElement, settings) {
  if (hasInvalidInput(inputList, settings)) {
    setButtonActivity(buttonElement, false, settings);
  } else {
    setButtonActivity (buttonElement, true, settings);
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
  const forms = Array.from(document.querySelectorAll(settings.formSelector));
  forms.forEach((formElement) => setListenersErrors(formElement, settings));
};

export {enableValidation, resetInputErrors, setButtonActivity}
