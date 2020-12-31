import { capitalizeFirstLetter } from '../helpers/index';
import { STRINGS } from '../constants/index';

const {
  STATUS: { CASES, DEATHS, RECOVERED },
  PERIOD: { ALL, TODAY },
  AMOUNT: { PER100K },
} = STRINGS;

const statuses = [CASES, DEATHS, RECOVERED];
const periods = [ALL, TODAY];

function amountRelativeToPopulation(val, population) {
  const populationBase = 100_000;
  return +(populationBase * (val / population)).toFixed(2);
}

function positiveValueOrZero(val) {
  return val < 0 ? 0 : val;
}

function createDataFields(isHistoric = false) {
  return statuses.reduce((acc, status) => {
    const statusInKey = capitalizeFirstLetter(status);

    periods.forEach((period) => {
      Object.assign(acc, {
        [`${period}${statusInKey}`]: isHistoric ? [] : 0,
        [`${period}${statusInKey}${PER100K}`]: isHistoric ? [] : 0,
      });
    });

    return acc;
  }, {});
}

function createTemplate() {
  return {
    ...createDataFields(),

    historic: {
      dates: [],
      ...createDataFields(true),
    },
  };
}

function toHist(obj, type, value, dailyValue, pop) {
  const typeInKey = capitalizeFirstLetter(type);

  obj[`today${typeInKey}`].push(dailyValue);
  obj[`today${typeInKey}100k`].push(amountRelativeToPopulation(dailyValue, pop));
  obj[`all${typeInKey}`].push(value);
  obj[`all${typeInKey}100k`].push(amountRelativeToPopulation(value, pop));
}

export {
  createTemplate,
  amountRelativeToPopulation,
  positiveValueOrZero,
  toHist,
};
