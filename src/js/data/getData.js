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

  const COUNTRIES = lastCountries.length;

  for (let i = 0; i < COUNTRIES; i += 1) {
    const lastCountry = lastCountries[i];
    const cumulativeCountry = cumulativeCountries[i];

    if (cumulativeCountry) {
      const {
        country: name,
        population,
        countryInfo: {
          lat, long, flag,
        },
      } = lastCountry;

      const countryObj = {
        name,
        population,
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
