import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const refs = {
   nameCountryInput:document.querySelector('#search-box'),
   countrysList:document.querySelector('.country-list'),
   countryInfo:document.querySelector('.country-info')
}

console.log(fetchCountries);

refs.nameCountryInput.addEventListener('input', debounce(countryNameInputHandler,DEBOUNCE_DELAY))

function countryNameInputHandler(e) {
   const inputValue = refs.nameCountryInput.value;
   console.log(inputValue);
   
}