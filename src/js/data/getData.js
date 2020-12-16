import { NUMBERS } from '../constants/index';
import fetchData from './_fetchData';
import processData from './_processData';
import getCountryObj from './_getCountryObj';

async function getData(urls) {
  const [
    lastWorld,
    cumulativeWorld,
    lastCountries,
    cumulativeCountries,
  ] = await fetchData(urls);

  const result = {
    World: {
      name: 'World',
      population: lastWorld.population,
      abs: {
        ...processData(cumulativeWorld, lastWorld),
      },
      per100k: {
        ...processData(cumulativeWorld, lastWorld, lastWorld.population),
      },
    },
  };

  const COUNTRIES = lastCountries.length;

  for (let i = NUMBERS.ZERO; i < COUNTRIES; i += 1) {
    const lastCountry = lastCountries[i];
    const cumulativeCountry = cumulativeCountries[i];

    if (cumulativeCountry) {
      const { country: name } = lastCountry;
      result[name] = getCountryObj(lastCountry, cumulativeCountry);
    }
  }

  return result;
}

export default getData;
