import cap from '../helpers/cap';
import { NUMBERS, STRINGS } from '../constants/index';

function val100k(val, pop) {
  return +(NUMBERS['100K'] * (val / pop)).toFixed(2);
}

function createTypeFields(type) {
  return {
    [`today${cap(type)}`]: 0,
    [`today${cap(type)}100k`]: 0,
    [`all${cap(type)}`]: 0,
    [`all${cap(type)}100k`]: 0,
  };
}

function createDataFields() {
  return {
    ...createTypeFields(STRINGS.TYPES.CASES),
    ...createTypeFields(STRINGS.TYPES.DEATHS),
    ...createTypeFields(STRINGS.TYPES.RECOVERED),
  };
}

function createHistoricTemplate() {
  return {
    historic: {
      dates: [],

      todayCases: [],
      todayDeaths: [],
      todayRecovered: [],
      todayCases100k: [],
      todayDeaths100k: [],
      todayRecovered100k: [],

      allCases: [],
      allDeaths: [],
      allRecovered: [],
      allCases100k: [],
      allDeaths100k: [],
      allRecovered100k: [],
    },
  };
}

function createTemplate() {
  return {
    ...createDataFields(),
    ...createHistoricTemplate(),
  };
}

export {
  createTemplate,
  createHistoricTemplate,
  cap,
  val100k,
};
