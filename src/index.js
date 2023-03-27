import './css/styles.css';

import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const countryGlobalTest = [
		{
			name: "Ukraine",
			src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Ukraine.svg/800px-Flag_of_Ukraine.svg.png",
			capital: "Kyiv",
			population: "46000000",
			languages: "Ukrainian"
		},
		{
			name: "Great Britian",
			src: "https://cdn.britannica.com/25/4825-050-977D8C5E/Flag-United-Kingdom.jpg",
			capital: "London",
			population: "55000000",
			languages: "English"
		},
		{
			name: "Poland",
			src: "https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Flag_of_Poland.svg/800px-Flag_of_Poland.svg.png",
			capital: "Wrazlav",
			population: "36000000",
			languages: "Polish"
		},
	];

const refs = {
   nameCountryInput:document.querySelector('#search-box'),
   countrysList:document.querySelector('.country-list'),
   countryInfo:document.querySelector('.country-info')
}

refs.nameCountryInput.addEventListener('input', debounce(countryNameInputHandler,DEBOUNCE_DELAY))

function countryNameInputHandler() {
   const searchQuery = refs.nameCountryInput.value.trim();

  if (searchQuery) {
     fetchCountries(searchQuery).then(countryResponceHandler).catch(Notify.failure('Oops, there is no country with that name'))
  }
}

function countryResponceHandler(countries) {
   if (countries.length>10) {
      Notify.info("Too many matches found. Please enter a more specific name.")
      return
   } else if (countries.length === 1) {
      refs.countrysList.innerHTML = countries.map(country => {
      createCountryListMarkup(country)}).join('')
      
   }
}

function createCountryListMarkup({src,name}) {
   return `<li>
        <svg class="country-flag" width="40" height="40">
          <use href="${src}"></use>
        </svg>
      <p class="country-name">${name}</p>
      </li>`
}

countryResponceHandler(countryGlobalTest)