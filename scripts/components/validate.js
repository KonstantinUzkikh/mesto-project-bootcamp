let selectors = {};

function showInputError (formElement, inputElement) {
  const errorElement = formElement.querySelector(`.popup__input-error_${inputElement.id}`);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(selectors.errorClass);
  inputElement.classList.add(selectors.inputErrorClass);
};

function hideInputError (formElement, inputElement) {
  const errorElement = formElement.querySelector(`.popup__input-error_${inputElement.id}`);
  inputElement.classList.remove(selectors.inputErrorClass);
  errorElement.classList.remove(selectors.errorClass);
  errorElement.textContent = '';
};

function checkValidity (formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement);
  } else {
    hideInputError(formElement, inputElement);
  }
};

function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {return !inputElement.validity.valid})
};

function resetInputErrors (formElement) {
  const inputsArray = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  inputsArray.forEach((inputElement) => hideInputError(formElement, inputElement));
}

function setButtonActivity (button, state) {
  if (state) {
    button.removeAttribute('disabled');
    button.classList.remove(selectors.inactiveButtonClass);
  } else {
    button.setAttribute('disabled', true);
    button.classList.add(selectors.inactiveButtonClass);
  }
};

function toggleButtonState (inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    setButtonActivity(buttonElement, false);
  } else {
    setButtonActivity (buttonElement, true);
  }
};

function setListenersErrors (formElement) {
  const inputsArray = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  const button = formElement.querySelector(selectors.submitButtonSelector);
  inputsArray.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkValidity(formElement, inputElement);
      toggleButtonState (inputsArray, button);
    });
  });
}

function enableValidation (validitySelectors) {
  selectors = validitySelectors;
  const forms = Array.from(document.querySelectorAll(selectors.formSelector));
  forms.forEach((formElement) => setListenersErrors(formElement));
};

export {enableValidation, resetInputErrors, setButtonActivity}
