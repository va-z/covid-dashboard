import { NUMBERS } from '../constants/index';

function createTemplateFields(type = null) {
  return {
    cases: type && {},
    deaths: type && {},
    recovered: type && {},
  };
}

function getGrossOrPer100k(val, pop) {
  if (pop === null) {
    return val;
  }

  return Math.round(NUMBERS['100K'] * (val / pop));
}

export { createTemplateFields, getGrossOrPer100k };
