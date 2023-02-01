import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const inputMail = document.querySelector('input[name="email"]');
const inputMessage = document.querySelector('textarea[name="message"]');

let inputValues = {
  email,
  message,
};

const storageKey = 'feedback-form-state';

feedbackForm.addEventListener('input', textInput);
feedbackForm.addEventListener('submit', onSubmit);

function textInput() {
  try {
    const { email, message } = inputValues;
    email = inputMail.value;
    message = inputMessage.value;

    serializedData();
  } catch (error) {
    console.error('set err', error.message);
  }
}

function onSubmit() {
  if (inputMail === '' || inputMessage === '') {
    alert('All fields must be filled');
  }
  console.log('Email:', inputValues.email);
  console.log('Message:', inputValues.message);
}

function serializedData() {
  localStorage.setItem(storageKey, JSON.stringify(inputValues));
}

function getData() {
  const savedData = localStorage.getItem(storageKey);
  const parcedSavedData = JSON.parse(savedData);
  try {
    if (savedData) {
      inputMail.value = parcedSavedData.email;
      inputMessage.value = parcedSavedData.message;
    }
  } catch (error) {
    console.error('get err', error.message);
  }
}
