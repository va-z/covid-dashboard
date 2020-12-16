const URLS = {
  LAST_WORLD: 'https://disease.sh/v3/covid-19/all?yesterday=true',
  LAST_COUNTRIES: 'https://disease.sh/v3/covid-19/countries?yesterday=true',
  CUMULATIVE_WORLD_BASE: 'https://disease.sh/v3/covid-19/historical/all',
  CUMULATIVE_COUNTRIES_BASE: 'https://disease.sh/v3/covid-19/historical/',
  CUMULATIVE_PARAM: '?lastdays=all',
};

Object.freeze(URLS);

export default URLS;
