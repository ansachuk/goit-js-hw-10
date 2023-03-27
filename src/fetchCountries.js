const BASIC_URL = 'https://restcountries.com/';

export function fetchCountries(name) {
  return fetch(`${BASIC_URL}/${name}`).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });
}
