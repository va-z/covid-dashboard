const CONFIGS = {
  LOCALE: 'ru-RU',
  STORAGE_KEY: 'vazSavedState',
  AUTHOR_1: 'https://github.com/va-z',
  AUTHOR_2: 'https://github.com/ansivgit',
  RSS: 'https://rs.school/js/',

  COVID_URLS: {
    LAST_WORLD: 'https://disease.sh/v3/covid-19/all?yesterday=true',
    LAST_COUNTRIES: 'https://disease.sh/v3/covid-19/countries?yesterday=true',
    CUMULATIVE_WORLD_BASE: 'https://disease.sh/v3/covid-19/historical/all',
    CUMULATIVE_COUNTRIES_BASE: 'https://disease.sh/v3/covid-19/historical/',
    CUMULATIVE_PARAM: '?lastdays=all',
  },

  COLOR: {
    OPAQUE: '66',
    CASES: '#9f0000',
    DEATHS: '#8d3f74',
    RECOVERED: '#ff523c',
    WRONG: '#eb4034',
  },

  MAP: {
    TILES: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
    ATTRIBUTION: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    ACCESS_TOKEN: 'pk.eyJ1IjoidmEteiIsImEiOiJja2l6eDllcG0wNWp2MzNxajl0NTc3a2pkIn0.LB0pyLi9ckMonbnpiQ-i9g',
    ID: 'mapbox/streets-v11',
    POSITION: 'topright',

    MAX_ZOOM: 18,
    MIN_ZOOM: 2,
    TILE_SIZE: 512,
    ZOOM_OFFSET: -1,

    MIN_LAT: -90,
    MIN_LONG: -180,
    MAX_LAT: 90,
    MAX_LONG: 180,

    MIN_MARKER_AREA: 50,
    MAX_MARKER_AREA: 2000,

    FILL_OPACITY: '0.5',
  },

  GRAPH: {
    CTX_WIDTH: '10',
    CTX_HEIGHT: '15',
  },
};

export default CONFIGS;
