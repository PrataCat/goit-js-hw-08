import throttle from 'lodash.throttle';

const throttle = require('lodash.throttle');

const feedbackForm = document.querySelector('.feedback-form');
const inputMail = document.querySelector('input[name="email"]');
const inputMessage = document.querySelector('textarea[name="message"]');
const storageKey = 'feedback-form-state';

let inputValues = {
  email: '',
  message: '',
};

getSerializedData();

feedbackForm.addEventListener('input', throttle(setInputText, 500));
feedbackForm.addEventListener('submit', onSubmit);

function setInputText() {
  try {
    inputValues.email = inputMail.value;
    inputValues.message = inputMessage.value;
    const serializedData = JSON.stringify(inputValues);
    localStorage.setItem(storageKey, serializedData);
  } catch (error) {
    console.error('set err', error.message);
  }
}

function getSerializedData() {
  try {
    let getData = localStorage.getItem(storageKey);
    if (getData === null) {
      return (getData = undefined);
    } else {
      const parsedGetData = JSON.parse(getData);
      inputMail.value = parsedGetData.email;
      inputMessage.value = parsedGetData.message;
    }
  } catch (error) {
    console.error('get err', error.message);
  }
}

function onSubmit(e) {
  e.preventDefault();
  inputValues.email = inputMail.value;
  inputValues.message = inputMessage.value;
  if (inputValues.email.trim() === '' || inputValues.message.trim() === '') {
    alert('All fields must be filled');
    return;
  }
  console.log('Email:', inputValues.email);
  console.log('Message:', inputValues.message);
  e.currentTarget.reset();
  localStorage.removeItem(storageKey);
}
