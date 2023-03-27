const BASIC_URL='https://restcountries.com/'

export default function fetchCountries(name) {
   fetch(`${BASIC_URL}${name}`).then(res=>res.json())
 }
