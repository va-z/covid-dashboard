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

function pushToHistoric(obj, typeInKey, value, dailyValue, population) {
  const val = positiveValueOrZero(value);
  const dailyVal = positiveValueOrZero(dailyValue);

  obj[`${ALL}${typeInKey}`].push(val);
  obj[`${TODAY}${typeInKey}`].push(dailyVal);
  obj[`${ALL}${typeInKey}${PER100K}`].push(amountRelativeToPopulation(val, population));
  obj[`${TODAY}${typeInKey}${PER100K}`].push(amountRelativeToPopulation(dailyVal, population));
}

function addLastValues(obj, type, typeInKey, lastObj, population) {
  const result = obj;
  const allValue = lastObj[type];
  const todayValue = lastObj[`${TODAY}${typeInKey}`];

  result[`${TODAY}${typeInKey}`] = todayValue;
  result[`${ALL}${typeInKey}`] = allValue;
  result[`${TODAY}${typeInKey}100k`] = amountRelativeToPopulation(todayValue, population);
  result[`${ALL}${typeInKey}100k`] = amountRelativeToPopulation(allValue, population);
}

export {
  createTemplate,
  pushToHistoric,
  addLastValues,
};
