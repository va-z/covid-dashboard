const URLS = {
  COUNTRIES: 'https://restcountries.eu/rest/v2/all?fields=name;alpha2Code;flag',
  COVID_BASE: 'https://disease.sh/v3/covid-19/historical/',
  COVID_PARAM: '?lastdays=all',
  FLAGS: 'https://restcountries.eu/rest/v2/alpha?codes=', /* needs a 3-letter country code */
};

Object.freeze(URLS);

export default URLS;
