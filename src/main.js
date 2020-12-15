import './scss/index.scss';
import URLS from './js/data/URLS';
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

//     const date = getUTCDatestring(str);
//     const result = {
//       date,
//       Global: {
//         ...Global,
//         daily: {
//           [date]: {
//             confirmed: 0,
//             recovered: 0,
//             deaths: 0,
//           },
//         },
//       },
//     };

//     const codes = Countries
// .reduce((acc, { CountryCode }) => `${acc},${CountryCode}`, '').slice(1);

//     return [
//       key,
//       result,
//       Countries,
//       codes,
//     ];
//   }).then(([_0, _1, _2, codes]) => {
//     const url = URLS.TOTALS_BASE + codes + URLS.TOTALS_PARAM;
//     return fetch(url)
//       .then((res) => res.json())
//       .then((res) => {
//         console.log(res);
//       });
//   });

async function getCountriesList(url) {
  return fetch(url).then((res) => res.json());
}

async function getData({ COUNTRIES, COVID_BASE, COVID_PARAM }) {
  const countriesData = await getCountriesList(COUNTRIES);
  const codes = countriesData.reduce((acc, { alpha2Code }) => `${acc},${alpha2Code}`, '').slice(1);
  const covidURL = COVID_BASE + codes + COVID_PARAM;
  const covidData = await fetch(covidURL).then((res) => res.json());
  const ZERO = 0;
  const LENGTH = covidData.length;
  // const data = {};
  const world = {
    totalCases: 0,
    totalRecovered: 0,
    totalDeaths: 0,
    daily: {},
  };

  // console.log(countriesData, covidData);

  for (let i = ZERO; i < LENGTH; i += 1) {
    // if (covidData[i] === null) {
    //   continue;
    // }

    const { name, alpha2Code, flag } = countriesData[i];
    const { cases, deaths, recovered } = covidData[i].timeline;
    const obj = {
      name,
      alpha2Code,
      flag,
      cases,
      deaths,
      recovered,
      casesTotal: 0,
      deathsTotal: 0,
      recoveredTotal: 0,
    };

    const casesEntries = Object.entries(cases);
    const deathsEntries = Object.entries(deaths);
    const recoveredEntries = Object.entries(recovered);

    for (let j = 0; j < cases.length; j = +1) {
      const [day, caseVal] = casesEntries[j];
      const deathsVal = deathsEntries[j][1];
      const recoveredVal = recoveredEntries[j][1];

      obj.totalCases += caseVal;
      obj.totalDeaths += deathsVal;
      obj.totalRecovered += recoveredVal;
      world.totalCases += caseVal;
      world.deathsTotal += deathsVal;
      world.recoveredTotal += recoveredVal;

      world.daily.cases[day] = world.daily.cases[day] ? world.daily.cases[day] + caseVal : caseVal;
      world.daily.deaths[day] = world.daily.deaths[day]
        ? world.daily.deaths[day] + deathsVal : deathsVal;
      world.daily.recovered[day] = world.daily.recovered[day]
        ? world.daily.recovered[day] + recoveredVal : recoveredVal;
    }
  }
}

getData(URLS);
