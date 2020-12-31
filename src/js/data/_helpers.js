import { capitalizeFirstLetter } from '../helpers/index';
import { NUMBERS, STRINGS } from '../constants/index';

const { CASES, DEATHS, RECOVERED } = STRINGS.STATUS;

function amountPer100kPopulation(val, population) {
  return +(NUMBERS['100K'] * (val / population)).toFixed(2);
}

function noSubZero(val) {
  return val < 0 ? 0 : val;
}

function toHist(obj, type, val, dailyVal, pop) {
  const typeInKey = capitalizeFirstLetter(type);

  obj[`today${typeInKey}`].push(dailyVal);
  obj[`today${typeInKey}100k`].push(amountPer100kPopulation(dailyVal, pop));
  obj[`all${typeInKey}`].push(val);
  obj[`all${typeInKey}100k`].push(amountPer100kPopulation(val, pop));
}

function createTypeFields(type, isHistoric) {
  const typeInKey = capitalizeFirstLetter(type);

  return {
    [`today${typeInKey}`]: isHistoric ? [] : 0,
    [`today${typeInKey}100k`]: isHistoric ? [] : 0,
    [`all${typeInKey}`]: isHistoric ? [] : 0,
    [`all${typeInKey}100k`]: isHistoric ? [] : 0,
  };
}

function createDataFields(isHistoric = false) {
  return {
    ...createTypeFields(CASES, isHistoric),
    ...createTypeFields(DEATHS, isHistoric),
    ...createTypeFields(RECOVERED, isHistoric),
  };
}

function createHistoricTemplate() {
  return {
    historic: {
      dates: [],
      ...createDataFields(true),
    },
  };
}

function createTemplate() {
  return {
    ...createDataFields(),
    ...createHistoricTemplate(true),
  };
}

export {
  createTemplate,
  createHistoricTemplate,
  amountPer100kPopulation,
  noSubZero,
  toHist,
};
