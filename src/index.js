import './css/styles.css';

import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchCountries from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
   nameCountryInput:document.querySelector('#search-box'),
   countrysList:document.querySelector('.country-list'),
   countryInfo:document.querySelector('.country-info')
}

refs.nameCountryInput.addEventListener('input', debounce(countryNameInputHandler,DEBOUNCE_DELAY))

function countryNameInputHandler() {
   const inputValue = refs.nameCountryInput.value.trim();

  if (inputValue) {
     fetchCountries(inputValue).then(countryResponceHandler).catch(Notify.failure('Oops, there is no country with that name'))
  }
}

function countryResponceHandler(countries) {
   
}