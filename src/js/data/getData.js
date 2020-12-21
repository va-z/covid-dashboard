import codes from './_codes.json';
import { NUMBERS } from '../constants/index';
import getRawData from './_getRawData';
import processData from './_processData';

async function getData(urls) {
  const [
    lastWorld,
    cumulativeWorld,
    lastCountries,
    cumulativeCountries,
  ] = await getRawData(urls);

  const result = [
    {
      name: 'World',
      population: lastWorld.population,
      ...processData(lastWorld, cumulativeWorld, lastWorld.population),
    },
  ];

  const codesMap = codes.reduce((acc, obj) => {
    acc[obj['alpha-2']] = obj['country-code'];
    return acc;
  }, {});

  const COUNTRIES = lastCountries.length;

  for (let i = NUMBERS.ZERO; i < COUNTRIES; i += 1) {
    const lastCountry = lastCountries[i];
    const cumulativeCountry = cumulativeCountries[i];

    if (cumulativeCountry) {
      const {
        country: name,
        population,
        countryInfo: {
          iso2, lat, long, flag,
        },
      } = lastCountry;

      const countryObj = {
        name,
        population,
        code: codesMap[iso2],
        iso2,
        lat,
        long,
        flag,
        ...processData(lastCountry, cumulativeCountry.timeline, population),
      };

      result.push(countryObj);
    }
  }

  return {
    updateTimestamp: lastWorld.updated,
    data: result,
  };
}

export default getData;
