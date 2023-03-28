import './css/styles.css';

import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  nameCountryInput: document.querySelector('#search-box'),
  countrysList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.nameCountryInput.addEventListener(
  'input',
  debounce(countryNameInputHandler, DEBOUNCE_DELAY)
);

function countryNameInputHandler() {
  const searchQuery = refs.nameCountryInput.value.trim();

  if (!searchQuery) {
    clearAllInfo();
    return;
  }

  fetchCountries(searchQuery).then(countryResponceHandler);
  // .catch(Notify.failure('Oops, there is no country with that name'));
}

function countryResponceHandler(countries) {
  console.log(countries);
  if (countries.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  } else if (countries.length === 1) {
    clearAllInfo();
    refs.countryInfo.innerHTML = createOneCountryMarkup(countries);
  } else {
    clearAllInfo();
    refs.countrysList.innerHTML = countries
      .map(createCountryListMarkup)
      .join('');
  }
}

function createCountryListMarkup({ flags, name }) {
  // console.log(name.official);
  return `<li class="country-list-item">
      <img src="${flags.svg}" alt="country flag" width="40" height="40" />
      <p class="country-name">${name.official}</p>
      </li>`;
}

function createOneCountryMarkup({
  flags,
  name,
  capital,
  population,
  languages,
}) {}

function clearAllInfo() {
  refs.countryInfo.innerHTML = '';
  refs.countrysList.innerHTML = '';
}
