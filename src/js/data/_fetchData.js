async function fetchData({
  LAST_COUNTRIES,
  LAST_WORLD,
  CUMULATIVE_WORLD_BASE,
  CUMULATIVE_COUNTRIES_BASE,
  CUMULATIVE_PARAM,
}) {
  const dataArr = await Promise.all([
    fetch(LAST_WORLD).then((res) => res.json()),
    fetch(CUMULATIVE_WORLD_BASE + CUMULATIVE_PARAM).then((res) => res.json()),
    fetch(LAST_COUNTRIES).then((res) => res.json()),
  ]);
  const alpha2Codes = dataArr[2]
    .reduce((acc, { countryInfo: { iso2 } }) => `${acc},${iso2}`, '')
    .slice(1);
  const url = `${CUMULATIVE_COUNTRIES_BASE}${alpha2Codes}${CUMULATIVE_PARAM}`;
  const cumulativeCountries = await fetch(url).then((res) => res.json());

  dataArr.push(cumulativeCountries);
  return dataArr;
}

export default fetchData;
