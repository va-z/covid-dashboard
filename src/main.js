import './scss/index.scss';
import URLS from './js/data/URLS';
import getData from './js/data/getData';

// import storage from './js/helpers/storage';
// import getUTCDatestring from './js/helpers/getUTCDatestring';
// import App from './js/App';

// const MESSAGE = 'No unnecessary requests';

// fetch(URLS.SUMMARY)
//   .then((res) => res.json())
//   .then(({ Date: str, Countries, Global }) => {
//     const key = `vazData-${str}`;

//     if (storage.get(key)) {
//       throw new Error(MESSAGE);
//     }

console.log(getData(URLS));
