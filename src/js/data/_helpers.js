import cap from '../helpers/cap';
import { NUMBERS, STRINGS } from '../constants/index';

function val100k(val, pop) {
  return Math.round(NUMBERS['100K'] * (val / pop));
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

function createHistoricTemplate(dateStr) {
  return {
    date: dateStr,
    ...createDataFields(),
  };
}

function createTemplate() {
  return {
    ...createDataFields(),
    historic: [],
  };
}

export {
  createTemplate,
  createHistoricTemplate,
  cap,
  val100k,
};
