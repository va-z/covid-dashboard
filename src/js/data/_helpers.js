import { capitalizeFirstLetter } from '../helpers/index';
import { STRINGS } from '../constants/index';

const { CASES, DEATHS, RECOVERED } = STRINGS.STATUS;

function amountRelativeToPopulation(val, population) {
  const populationBase = 100_000;
  return +(populationBase * (val / population)).toFixed(2);
}

function noSubZero(val) {
  return val < 0 ? 0 : val;
}

function toHist(obj, type, val, dailyVal, pop) {
  const typeInKey = capitalizeFirstLetter(type);

  obj[`today${typeInKey}`].push(dailyVal);
  obj[`today${typeInKey}100k`].push(amountRelativeToPopulation(dailyVal, pop));
  obj[`all${typeInKey}`].push(val);
  obj[`all${typeInKey}100k`].push(amountRelativeToPopulation(val, pop));
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
  amountRelativeToPopulation,
  noSubZero,
  toHist,
};
