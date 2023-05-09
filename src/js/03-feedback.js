import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const localStorageData = 'feedback-form-state';

feedbackForm.elements.email.setAttribute('required', '');
feedbackForm.elements.message.setAttribute('required', '');

feedbackForm.addEventListener('submit', formSubmit);
feedbackForm.addEventListener('input', throttle(saveInputData, 500));

function formSubmit(evt) {
    evt.preventDefault();
    localStorage.removeItem(localStorageData);
  
    const formDataObj = {};
    const formData = new FormData(feedbackForm);
  
    formData.forEach((value, key) => {
      console.log(key, value);
      formDataObj[key] = value;
    });
  
    console.log('Дані з форми:', formDataObj);
  
    evt.currentTarget.reset();
  }

function saveInputData(evt) {
    let persistedData = localStorage.getItem(localStorageData);
    persistedData = persistedData ? JSON.parse(persistedData) : {};
    persistedData[evt.target.name] = evt.target.value;
    localStorage.setItem(localStorageData, JSON.stringify(persistedData));
}

function updateInputData() {
  let persistedData = localStorage.getItem(localStorageData);

  if (persistedData) {
    try {
      persistedData = JSON.parse(persistedData);
      Object.entries(persistedData).forEach(([name, value]) => {
        feedbackForm.elements[name].value = value;
      });
    } catch (error) {
      console.log(error.name); 
      console.log(error.message); 
    }
  }
}

updateInputData();