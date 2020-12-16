import processData from './_processData';

function getCountryObj(lastCountry, cumulativeCountry) {
  const {
    country: name,
    population,
    countryInfo: {
      iso2, lat, long, flag,
    },
  } = lastCountry;

  return {
    name,
    population,
    iso2,
    lat,
    long,
    flag,
    abs: {
      ...processData(cumulativeCountry.timeline, lastCountry),
    },
    per100k: {
      ...processData(cumulativeCountry.timeline, lastCountry, population),
    },
  };
}

export default getCountryObj;
