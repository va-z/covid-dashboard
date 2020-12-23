import { NUMBERS } from '../constants/index';
import {
  createTemplate,
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
      const date = datesEntries[j][0];
      let value = datesEntries[j][1];
      const prevValue = (datesEntries[j - 1]?.[1] ?? 0);
      let dailyValue = value - prevValue;
      const histObj = result.historic;

      if (value < 0) {
        value = 0;
      }

      if (dailyValue < 0) {
        dailyValue = 0;
      }

      if (histObj.dates.length < DAYS_AMOUNT) {
        histObj.dates.push(new Date(date));
      }

      histObj[`today${cap(type)}`].push(dailyValue);
      histObj[`today${cap(type)}100k`].push(val100k(dailyValue, pop));
      histObj[`all${cap(type)}`].push(value);
      histObj[`all${cap(type)}100k`].push(val100k(dailyValue, pop));
    }

    const histArr = result.historic[`all${cap(type)}`];
    const lastHistoricValue = histArr[histArr.length - 1];
    const allValue = last[type];
    const todayValue = last[`today${cap(type)}`];

    result[`all${cap(type)}`] = allValue || lastHistoricValue;
    result[`all${cap(type)}100k`] = val100k(allValue || lastHistoricValue, pop);
    result[`today${cap(type)}`] = todayValue;
    result[`today${cap(type)}100k`] = val100k(todayValue, pop);
  }
  return result;
}

export default processData;
