import { NUMBERS } from '../constants/index';
import {
  createTemplate,
  createHistoricTemplate,
  val100k,
  cap,
} from './_helpers';

function processData(last, timeline, pop) {
  const timelineEntries = Object.entries(timeline);
  const TYPES_AMOUNT = timelineEntries.length;
  const result = createTemplate();

  for (let i = NUMBERS.ZERO; i < TYPES_AMOUNT; i += 1) {
    const [type, dates] = timelineEntries[i];
    const datesEntries = Object.entries(dates);
    const DAYS_AMOUNT = datesEntries.length;

    for (let j = NUMBERS.ZERO; j < DAYS_AMOUNT; j += 1) {
      const [date, value] = datesEntries[j];
      const prevValue = (datesEntries[j - 1]?.[1] ?? 0);
      const dailyValue = value - prevValue;

      if (i === NUMBERS.ZERO) {
        result.historic.push(createHistoricTemplate(date));
      }

      const historicObj = result.historic[j];

      historicObj[`today${cap(type)}`] = dailyValue;
      historicObj[`today${cap(type)}100k`] = val100k(dailyValue, pop);
      historicObj[`all${cap(type)}`] = value;
      historicObj[`all${cap(type)}100k`] = val100k(dailyValue, pop);
    }

    const todayValue = last[`today${cap(type)}`];
    const allValue = last[type];

    result[`all${cap(type)}`] = allValue;
    result[`all${cap(type)}100k`] = val100k(allValue, pop);
    result[`today${cap(type)}`] = todayValue;
    result[`today${cap(type)}100k`] = val100k(todayValue, pop);
  }
  return result;
}

export default processData;
