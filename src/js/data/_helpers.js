import { cap } from '../helpers/index';
import { NUMBERS, STRINGS } from '../constants/index';

const { CASES, DEATHS, RECOVERED } = STRINGS.STATUS;

function val100k(val, pop) {
  return +(NUMBERS['100K'] * (val / pop)).toFixed(2);
}

function noSubZero(val) {
  return val < 0 ? 0 : val;
}

function toHist(obj, type, val, dailyVal, pop) {
  obj[`today${cap(type)}`].push(dailyVal);
  obj[`today${cap(type)}100k`].push(val100k(dailyVal, pop));
  obj[`all${cap(type)}`].push(val);
  obj[`all${cap(type)}100k`].push(val100k(val, pop));
}

function createTypeFields(type, isHistoric) {
  return {
    [`today${cap(type)}`]: isHistoric ? [] : 0,
    [`today${cap(type)}100k`]: isHistoric ? [] : 0,
    [`all${cap(type)}`]: isHistoric ? [] : 0,
    [`all${cap(type)}100k`]: isHistoric ? [] : 0,
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
  cap,
  val100k,
  noSubZero,
  toHist,
};
