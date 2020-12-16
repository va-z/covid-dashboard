import { NUMBERS } from '../constants/index';
import { createTemplateFields, getGrossOrPer100k } from './_helpers';

function processData(cumulative, today, pop = null) {
  const cumulativeEntries = Object.entries(cumulative);
  const TYPES = cumulativeEntries.length;
  const result = {
    cumulative: { ...createTemplateFields(true) },
    daily: { ...createTemplateFields(true) },
    total: { ...createTemplateFields() },
    today: { ...createTemplateFields() },
  };

  for (let i = NUMBERS.ZERO; i < TYPES; i += 1) {
    const [type, dates] = cumulativeEntries[i];
    const datesEntries = Object.entries(dates);
    const DAYS = datesEntries.length;

    for (let j = NUMBERS.ZERO; j < DAYS; j += 1) {
      const [date, value] = datesEntries[j];
      const prevValue = (datesEntries[j - 1]?.[1] ?? 0);
      const dailyValue = value - prevValue;

      result.cumulative[type][date] = getGrossOrPer100k(value, pop);
      result.daily[type][date] = getGrossOrPer100k(dailyValue, pop);

      if (j === DAYS - 1) {
        result.total[type] = getGrossOrPer100k(value, pop);
      }
    }

    const todayValue = today[`today${type[0].toUpperCase() + type.slice(1)}`];
    result.today[type] = getGrossOrPer100k(todayValue, pop);
  }

  return result;
}

export default processData;
